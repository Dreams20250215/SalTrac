import os
import torch
from torch.utils.data import DataLoader
from dataset import get_dataset, collate_fn_efficientnet
from efficientnet_pytorch import EfficientNet
from tqdm import tqdm


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def validate(model, val_loader, criterion):
    model.eval() 
    total = 0
    correct = 0
    val_loss = 0.0

    with torch.no_grad():
        for image, label in val_loader:
            image = image.to(device)
            label = label.to(device)

            output = model(image)
            loss = criterion(output, label)
            val_loss += loss.item()

            preds = output.argmax(dim=1)
            correct += (preds == label).sum().item()
            total += label.size(0)

    avg_loss = val_loss / len(val_loader)
    acc = correct / total

    with open(os.path.join("./log", "val_loss.log"), "a") as f_loss:
        f_loss.write(str(avg_loss) + "\n")
    with open(os.path.join("./log", "val_acc.log"), "a") as f_acc:
        f_acc.write(str(acc) + "\n")

    print(f"Validation - Loss: {avg_loss:.4f}, ACC: {acc:.4f}")

    model.train()
    return avg_loss, acc


def main():
    # prepare dataset
    train_data = get_dataset('train')
    val_data = get_dataset('val')

    # define model
    model = EfficientNet.from_name("efficientnet-b0").to(device)        # efficientnet-b0
    # define optimizer
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    # define loss function
    criterion = torch.nn.CrossEntropyLoss().to(device)

    if not os.path.exists("./checkpoint"):
        os.makedirs("./checkpoint")
    if not os.path.exists("./log"):
        os.makedirs("./log")


    train_loader = DataLoader(train_data, batch_size=32, shuffle=True, drop_last=True, num_workers=2, collate_fn=collate_fn_efficientnet)
    val_loader = DataLoader(val_data, batch_size=32, shuffle=False, drop_last=False, num_workers=2, collate_fn=collate_fn_efficientnet)
    model = model.train()

    global_step = 1
    epoch = 100

    for i in range(100):
        pbar = tqdm(train_loader)
        for i, batch in enumerate(pbar):
            image, label = batch
            image = image.to(device)
            label = label.to(device)
            optimizer.zero_grad()
            output = model(image)
            loss = criterion(output, label)

            # calculate accuracy
            total = 0
            correct = 0
            preds = output.argmax(dim=1)
            correct += (preds == label).sum().item()
            total += label.size(0)
            acc = correct / total

            pbar.set_description("loss: {:.4f}, acc: {:.4f}".format(loss.item(), acc))
            
            with open(os.path.join("./log", "train_loss.log"), "a") as f:
                f.write(str(loss.item()) + "\n")
            with open(os.path.join("./log", "train_acc.log"), "a") as f:
                f.write(str(acc) + "\n")
            
            loss.backward()
            optimizer.step()

            if global_step % 2000 == 0:
                torch.save({'model': model.state_dict(), 'optimizer': optimizer.state_dict()}, os.path.join("./checkpoint", "food_detector_%d.pth" % global_step))
            global_step += 1
        
        validate(model, val_loader, criterion)

if __name__ == "__main__":
    main()
