
def get_food_class():
    classes = []
    with open("/home/fuseyoshiki/Data/food-101/meta/classes.txt") as f:
        classes = f.readlines()
    classes = [c.strip() for c in classes]
    return set(classes)

food_to_id = {food: i for i, food in enumerate(get_food_class())}
id_to_food = {i: food for i, food in enumerate(get_food_class())}


if __name__ == '__main__':
    print(len(get_food_class()))
    print(food_to_id)