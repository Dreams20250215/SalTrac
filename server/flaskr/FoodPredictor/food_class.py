
"""def get_food_class():
    classes = []
    with open("/home/fuseyoshiki/Data/food-101/meta/classes.txt") as f:
        classes = f.readlines()
    classes = [c.strip() for c in classes]
    return set(classes)"""

menu = ['fried_calamari', 'pulled_pork_sandwich', 'macarons', 'hamburger', 
        'macaroni_and_cheese', 'beef_tartare', 'beet_salad', 'greek_salad', 
        'samosa', 'caprese_salad', 'prime_rib', 'ramen', 'miso_soup', 'peking_duck', 
        'grilled_cheese_sandwich', 'gnocchi', 'french_onion_soup', 'cheese_plate', 'breakfast_burrito', 
        'red_velvet_cake', 'cheesecake', 'fried_rice', 'sashimi', 'nachos', 'spring_rolls', 
        'bread_pudding', 'mussels', 'pad_thai', 'scallops', 'panna_cotta', 'shrimp_and_grits', 
        'chocolate_cake', 'hot_and_sour_soup', 'dumplings', 'french_toast', 'clam_chowder', 
        'club_sandwich', 'omelette', 'tacos', 'chicken_curry', 'steak', 'hot_dog', 'apple_pie', 
        'churros', 'carrot_cake', 'pizza', 'eggs_benedict', 'hummus', 'guacamole', 'chicken_quesadilla', 
        'oysters', 'seaweed_salad', 'beignets', 'croque_madame', 'spaghetti_carbonara', 'sushi', 
        'poutine', 'pho', 'foie_gras', 'pancakes', 'pork_chop', 'donuts', 'ice_cream', 'baklava', 
        'beef_carpaccio', 'grilled_salmon', 'spaghetti_bolognese', 'deviled_eggs', 'waffles', 'lasagna',
        'bibimbap', 'lobster_roll_sandwich', 'falafel', 'onion_rings', 'chocolate_mousse', 'caesar_salad', 
        'cup_cakes', 'fish_and_chips', 'risotto', 'filet_mignon', 'bruschetta', 'ravioli', 'takoyaki', 
        'cannoli', 'gyoza', 'chicken_wings', 'creme_brulee', 'escargots', 
        'frozen_yogurt', 'huevos_rancheros', 'edamame', 'tiramisu', 'french_fries', 'lobster_bisque', 
        'crab_cakes', 'tuna_tartare', 'garlic_bread', 'ceviche', 'strawberry_shortcake', 'baby_back_ribs', 'paella']

food_to_id = {food: i for i, food in enumerate(menu)}
id_to_food = {i: food for i, food in enumerate(menu)}


if __name__ == '__main__':
    print(food_to_id)
    print(id_to_food)