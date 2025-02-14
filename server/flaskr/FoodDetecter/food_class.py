import os
from PIL import Image

def get_food_class():
    classes = []
    with open("/home/fuseyoshiki/Data/food-101/meta/classes.txt") as f:
        classes = f.readlines()
    classes = [c.strip() for c in classes]
    return set(classes)

food_to_id = {food: i for i, food in enumerate(get_food_class())}
id_to_food = {i: food for i, food in enumerate(get_food_class())}

with open("/home/fuseyoshiki/Data/food-101/meta/train.txt") as f:
    train_data = f.readlines()

train_data2 = [os.path.join("/home/fuseyoshiki/Data/food-101/images", data.strip()+".jpg") for data in train_data]
img = Image.open(train_data2[0])
print(img.size)
if __name__ == '__main__':
    #print(len(get_food_class()))
    #print(food_to_id)
    print(train_data[0])
    print(train_data2[0])
    print(train_data2[0].split("/")[-2])