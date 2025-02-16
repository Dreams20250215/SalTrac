import torch
from PIL import Image
import cv2
from torchvision import transforms
from efficientnet_pytorch import EfficientNet
from food_class import id_to_food, food_databae
from dataset import get_dataset


device = torch.device("cpu")

# load model
food_detector = EfficientNet.from_name('efficientnet-b0').eval().to(device)
checkpoint = torch.load("trained_model/food_predictor_72000.pth", map_location=device)
food_detector.load_state_dict(checkpoint['model'])


def predict_food_salt(food_data_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = cv2.imread(food_data_path)
    # BGR to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # OpenCV convert PIL
    image = Image.fromarray(image)
    image = transform(image)
    image = image.unsqueeze(0).to(device)
    with torch.no_grad():
        output = food_detector(image)
        pred_class_id = output.argmax(dim=1).item()
        prob_class = torch.softmax(output,dim=1)[0][pred_class_id].item()
        _, pred_food_name, salt = food_databae[pred_class_id]

    return pred_class_id, pred_food_name, salt, prob_class 


if __name__ == '__main__':
    # prepare data
    food_data_path = "/home/fuseyoshiki/Data/food-101/images/apple_pie/21063.jpg"
    pred_class_id, pred_food_name, salt, prob_class = predict_food_salt(food_data_path)
    print(f"Predicted class id: {pred_class_id}")
    print(f"Predicted food name: {pred_food_name}")
    print(f"Salt: {salt}")
    print(f"Probability: {prob_class:.4f}")
