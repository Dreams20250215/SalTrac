import os
import torch
from torch.utils.data import DataLoader
from dataset import get_dataset
from efficientnet_pytorch import EfficientNet


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

    model = model.train()

if __name__ == "__main__":
    main()
