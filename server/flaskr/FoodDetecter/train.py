import os
import torch
from torch.utils.data import DataLoader
from dataset import get_dataset
from efficientnet_pytorch import EfficientNet
from tqdm import tqdm


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def main():
    train_data = get_dataset('train')
    val_data = get_dataset('val')
    model = EfficientNet.from_name("efficientnet-b4").to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    criterion = torch.nn.CrossEntropyLoss().to(device)

    # define dataloader

    if not os.path.exists("./log"):
        os.makedirs("./log")

    train_loader = DataLoader(train_data, batch_size=32, shuffle=True, drop_last=True, cpu_num_workers=2)
    pbar = tqdm(train_loader)
    model = model.train()

    globa_step = 1
    epoch = 100

    for i in range(100):
        for i, batch in enumerate(pbar):
            image, label = batch
            image = image.to(device)
            label = label.to(device)
            optimizer.zero_grad()
            output = model(image)
            loss = criterion(output, label)
            pbar.set_description("loss: {:.4f}".format(loss.item()))
            
            with open(os.path.join("./log", "train_loss.log"), "a") as f:
                f.write(str(loss.item()) + "\n")
            
            loss.backward()
            optimizer.step()

            if globa_step % 2000 == 0:
                torch.save({'model': model.state_dict(), 'optimizer': optimizer.state_dict()}, os.path.join("./checkpoint", "food_detector_%d.pth", globa_step))
            globa_step += 1

if __name__ == "__main__":
    main()
