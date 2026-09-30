"""
Updated graphic generator highlighting JCERT Government Curriculum and NIPUN FLN Assessment Engine.
"""

import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("ppt_assets", exist_ok=True)

def create_sih_logo():
    img = Image.new("RGBA", (600, 200), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse([20, 20, 160, 160], outline=(235, 56, 7, 255), width=6)
    draw.line([90, 40, 90, 140], fill=(16, 149, 93, 255), width=5)
    draw.line([50, 90, 130, 90], fill=(235, 56, 7, 255), width=5)
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 36)
        font_sub = ImageFont.truetype("arialbd.ttf", 26)
    except:
        font_large = ImageFont.load_default()
        font_sub = font_large

    draw.text((180, 40), "SMART INDIA", fill=(15, 23, 42, 255), font=font_large)
    draw.text((180, 80), "HACKATHON", fill=(15, 23, 42, 255), font=font_large)
    draw.text((180, 125), "2026", fill=(235, 56, 7, 255), font=font_sub)
    img.save("ppt_assets/sih_logo.png")

def create_slide1_bulb():
    img = Image.new("RGBA", (800, 800), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse([200, 100, 600, 500], fill=(248, 250, 252, 255), outline=(203, 213, 225, 255), width=4)
    draw.chord([250, 150, 400, 450], 90, 270, fill=(235, 56, 7, 230), outline=(197, 40, 2, 255), width=4)
    draw.chord([400, 150, 550, 450], 270, 90, fill=(16, 149, 93, 230), outline=(10, 110, 68, 255), width=4)
    draw.line([400, 150, 400, 450], fill=(255, 255, 255, 255), width=6)
    for y in range(200, 420, 40):
        draw.line([400, y, 500, y], fill=(255, 255, 255, 220), width=3)
        draw.ellipse([495, y-5, 505, y+5], fill=(255, 255, 255, 255))
    draw.rectangle([340, 500, 460, 560], fill=(100, 116, 139, 255), outline=(71, 85, 105, 255), width=3)
    draw.rectangle([360, 560, 440, 590], fill=(71, 85, 105, 255))
    try:
        font = ImageFont.truetype("arialbd.ttf", 44)
    except:
        font = ImageFont.load_default()
    draw.text((360, 610), "SIH", fill=(15, 23, 42, 255), font=font)
    img.save("ppt_assets/slide1_bulb.png")

def create_slide2_solution_img():
    img = Image.new("RGBA", (1000, 700), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    try:
        f_title = ImageFont.truetype("arialbd.ttf", 26)
        f_head = ImageFont.truetype("arialbd.ttf", 20)
        f_body = ImageFont.truetype("arial.ttf", 16)
    except:
        f_title = ImageFont.load_default()
        f_head = f_title
        f_body = f_title

    draw.rounded_rectangle([20, 20, 980, 80], radius=15, fill=(15, 23, 42, 255))
    draw.text((40, 35), "PALASH-VANI: 5-Module Government MTB-MLE & Exam Suite", fill=(255, 181, 159, 255), font=f_title)

    modules = [
        ("1. Real-Time Voice Bridge (<1.2s)", 
         ["• Push-to-Talk 2-Way Walkie-Talkie", "• Hindi <-> Santhali, Mundari, Ho", "• Sub-1.2s Latency (Mandate <3s)", "• Large Classroom Teleprompter"], 
         (255, 245, 242, 255), (235, 56, 7, 255), 20, 100),
        ("2. JCERT Government Textbooks", 
         ["• 'भाषा अंजलि' & 'गणित ज्ञान' Series", "• Class 1 to 3 Syllabus & Lesson Scripts", "• Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) & Devanagari", "• Synchronized Bilingual Storybooks"], 
         (240, 253, 244, 255), (16, 149, 93, 255), 510, 100),
        ("3. NIPUN Assessment & Exam Hub", 
         ["• Periodic Formative & Summative Exams", "• Oral Reading Fluency & Listening Quiz", "• Instant AI Grading & Competency Radar", "• 1-Click Printable PDF Report Cards"], 
         (255, 251, 235, 255), (217, 119, 6, 255), 20, 390),
        ("4. Bilingual Worksheets & 100% Offline", 
         ["• Vector A4 Activity PDFs (Match/Trace)", "• 'Bolo Aur Jeeto' Phonics Star Arena", "• Zero Internet (IndexedDB Cache)", "• ~135MB RAM on 2GB Tablets"], 
         (248, 250, 252, 255), (15, 23, 42, 255), 510, 390),
    ]

    for title, points, bg, border, x, y in modules:
        draw.rounded_rectangle([x, y, x + 470, y + 260], radius=15, fill=bg, outline=border, width=3)
        draw.text((x + 20, y + 15), title, fill=border, font=f_head)
        draw.line([x + 20, y + 45, x + 450, y + 45], fill=border, width=2)
        py = y + 60
        for pt in points:
            draw.text((x + 20, py), pt, fill=(30, 41, 59, 255), font=f_body)
            py += 35

    img.save("ppt_assets/slide2_solution.png")

create_sih_logo()
create_slide1_bulb()
create_slide2_solution_img()
print("Updated graphic assets generated!")
