import os
from PIL import Image
from torch.utils.data import Dataset
from torchvision import transforms
from food_class import food_to_id

def get_dataset(flag='train'):
    return MyDataset("/home/fuseyoshiki/Data/food-101/images", flag)

class MyDataset(Dataset):
    def __init__(self, data_dir, flag):
        self.data_dir = data_dir
        if flag == 'train':
            self.setting_path = os.path.join("/home/fuseyoshiki/Data/food-101/meta", "train.txt")
        elif flag == 'val':
            self.setting_path = os.path.join("/home/fuseyoshiki/Data/food-101/meta", "test.txt")
        self.all_data_path = self.get_all_data()
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
            transforms.RandomHorizontalFlip(p=0.5),
            transforms.RandomRotation(30)
        ])

    def get_all_data(self):
        all_data = []
        with open(self.setting_path) as f:
            all_data = f.readlines()
        all_data = [os.path.join(self.data_dir, data.strip()+".jpg") for data in all_data]
        return all_data

    def __len__(self):
        return len(self.all_data_path)

    def __getitem__(self, idx):
        img_path = self.all_data_path[idx]
        label_name = img_path.split("/")[-2]
        label = food_to_id[label_name]
        img = Image.open(img_path)

        return 
