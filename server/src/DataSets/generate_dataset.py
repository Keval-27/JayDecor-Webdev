import random
import pandas as pd

options = {
    "color": ["White", "Earthy", "Bold", "Pastel", "Monochrome"],
    "furniture": ["Modern", "Rustic", "Vintage", "Minimalist", "Industrial"],
    "vibe": ["Calm", "Cozy", "Energetic", "Luxurious", "Creative"],
    "space": ["Living Room", "Bedroom", "Workspace", "Kitchen", "Balcony"],
    "material": ["Wood", "Fabric", "Metal", "Glass", "Stone"],
}

def determine_style(answers):
    color, furniture, vibe, space, material = answers

    style_scores = {
        "Minimalist": 0,
        "Boho": 0,
        "Modern": 0,
        "Scandinavian": 0,
        "Industrial": 0,
        "Rustic": 0,
        "Glam": 0,
        "Contemporary": 0,
        "Modern Minimalist": 0,
        "Farmhouse": 0,
        "Urban": 0,
        "Luxury Minimalist": 0,
        "Shabby Chic": 0,
        "Clean Modern": 0,
        "Industrial Chic": 0,
    }

    # Strong scoring rules for combos
    if color == "White" and furniture == "Modern" and vibe == "Calm":
        style_scores["Minimalist"] += 3
    if color == "Earthy" and furniture in ["Rustic", "Vintage"] and vibe == "Cozy":
        style_scores["Boho"] += 3
    if color == "Bold" and furniture == "Vintage" and vibe == "Energetic":
        style_scores["Modern"] += 3
    if color == "Pastel" and furniture == "Minimalist" and vibe == "Luxurious":
        style_scores["Scandinavian"] += 3
    if color == "Monochrome" and furniture == "Industrial" and vibe == "Creative":
        style_scores["Industrial"] += 3
    if furniture == "Rustic" and vibe == "Cozy":
        style_scores["Rustic"] += 2
    if color == "Bold" and vibe == "Luxurious":
        style_scores["Glam"] += 2
    if furniture == "Industrial" and vibe == "Creative":
        style_scores["Contemporary"] += 2
    if color == "Pastel" and furniture == "Minimalist" and vibe == "Calm":
        style_scores["Modern Minimalist"] += 3
    if color == "Earthy" and furniture == "Rustic" and space == "Kitchen":
        style_scores["Farmhouse"] += 2
    if color == "Bold" and furniture == "Modern" and vibe == "Energetic":
        style_scores["Urban"] += 2
    if color == "Monochrome" and furniture == "Minimalist" and vibe == "Luxurious":
        style_scores["Luxury Minimalist"] += 3
    if color == "Pastel" and furniture == "Rustic" and vibe == "Cozy":
        style_scores["Shabby Chic"] += 2
    if color == "White" and furniture == "Modern" and space == "Kitchen":
        style_scores["Clean Modern"] += 2
    if color == "Bold" and furniture == "Industrial" and space == "Balcony":
        style_scores["Industrial Chic"] += 2

    # Bonus points for single feature matches
    if color == "Earthy":
        style_scores["Boho"] += 1
        style_scores["Rustic"] += 1
        style_scores["Farmhouse"] += 1
    if furniture == "Vintage":
        style_scores["Boho"] += 1
        style_scores["Glam"] += 1
    if vibe == "Cozy":
        style_scores["Boho"] += 1
        style_scores["Rustic"] += 1
        style_scores["Shabby Chic"] += 1
    if space == "Bedroom":
        style_scores["Boho"] += 1
        style_scores["Scandinavian"] += 1
        style_scores["Shabby Chic"] += 1
    if material == "Wood":
        style_scores["Minimalist"] += 1
        style_scores["Rustic"] += 1
        style_scores["Farmhouse"] += 1

    return max(style_scores, key=style_scores.get)

# Strong combos mapping (for balanced generation)
style_to_combos = {
    "Minimalist": [["White", "Modern", "Calm", random.choice(options["space"]), random.choice(options["material"])] for _ in range(10)],
    "Boho": [["Earthy", random.choice(["Rustic", "Vintage"]), "Cozy", random.choice(["Bedroom", "Balcony"]), random.choice(["Wood", "Fabric"])] for _ in range(10)],
    "Modern": [["Bold", "Vintage", "Energetic", random.choice(options["space"]), "Metal"] for _ in range(10)],
    "Scandinavian": [["Pastel", "Minimalist", "Luxurious", "Bedroom", "Fabric"] for _ in range(10)],
    "Industrial": [["Monochrome", "Industrial", "Creative", "Kitchen", "Glass"] for _ in range(10)],
    "Rustic": [["Earthy", "Rustic", "Cozy", "Living Room", "Stone"] for _ in range(10)],
    "Glam": [["Bold", "Vintage", "Luxurious", "Bedroom", "Fabric"] for _ in range(10)],
    "Contemporary": [["Bold", "Industrial", "Creative", "Workspace", "Metal"] for _ in range(10)],
    "Modern Minimalist": [["Pastel", "Minimalist", "Calm", "Balcony", "Glass"] for _ in range(10)],
    "Farmhouse": [["Earthy", "Rustic", "Cozy", "Kitchen", "Wood"] for _ in range(10)],
    "Urban": [["Bold", "Modern", "Energetic", "Living Room", "Metal"] for _ in range(10)],
    "Luxury Minimalist": [["Monochrome", "Minimalist", "Luxurious", "Workspace", "Glass"] for _ in range(10)],
    "Shabby Chic": [["Pastel", "Rustic", "Cozy", "Bedroom", "Fabric"] for _ in range(10)],
    "Clean Modern": [["White", "Modern", "Calm", "Kitchen", "Stone"] for _ in range(10)],
    "Industrial Chic": [["Bold", "Industrial", "Creative", "Balcony", "Metal"] for _ in range(10)],
}

data = []

# First generate 10 samples per style based on combos
for style, combos in style_to_combos.items():
    for answers in combos:
        data.append(answers + [style])

# Fill the rest up to 500 with random combos, using determine_style to label
while len(data) < 500:
    answers = [
        random.choice(options["color"]),
        random.choice(options["furniture"]),
        random.choice(options["vibe"]),
        random.choice(options["space"]),
        random.choice(options["material"]),
    ]
    style = determine_style(answers)
    data.append(answers + [style])

# Shuffle to mix samples
random.shuffle(data)

# Save to CSV
columns = list(options.keys()) + ["style"]
df = pd.DataFrame(data, columns=columns)
df.to_csv("style_dataset.csv", index=False)

print(f"Dataset generated with {len(data)} samples and saved to style_dataset.csv")
