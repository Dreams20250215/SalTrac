from dataset import get_dataset

dataset = get_dataset('train')
print(dataset.__getitem__(0)[0].size())