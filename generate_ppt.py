"""
Generates the official SIH 2026 Idea Submission PPT for Problem Statement ID 26042: PALASH-VANI
Strictly adheres to the 6-slide SIH template structure.
"""

import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_sih_presentation(output_path="SIH2026_Idea_Submission_PS26042.pptx"):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Theme Colors
    NAVY = RGBColor(15, 23, 42)       # Slate 900
    NAVY_LIGHT = RGBColor(30, 41, 59) # Slate 800
    PALASH_ORANGE = RGBColor(235, 56, 7) # #eb3807 Vibrant Palash
    PALASH_BG = RGBColor(255, 245, 242)
    GREEN = RGBColor(16, 149, 93)     # Emerald Green
    GREEN_BG = RGBColor(240, 253, 244)
    TEXT_DARK = RGBColor(30, 41, 59)
    TEXT_MUTED = RGBColor(100, 116, 139)
    WHITE = RGBColor(255, 255, 255)
    BORDER_COLOR = RGBColor(226, 232, 240)
    CARD_BG = RGBColor(248, 250, 252)

    def add_header(slide, slide_title, slide_num):
        # Top banner line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.12))
        line.fill.solid()
        line.fill.fore_color.rgb = PALASH_ORANGE
        line.line.color.rgb = PALASH_ORANGE

        # Header Title text
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(9.5), Inches(0.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = slide_title
        p.font.name = 'Arial'
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = NAVY

        # SIH Branding badge on top right
        badge = slide.shapes.add_textbox(Inches(9.8), Inches(0.35), Inches(2.8), Inches(0.8))
        btf = badge.text_frame
        bp = btf.paragraphs[0]
        bp.alignment = PP_ALIGN.RIGHT
        bp.text = "SMART INDIA HACKATHON 2026"
        bp.font.name = 'Arial'
        bp.font.size = Pt(11)
        bp.font.bold = True
        bp.font.color.rgb = PALASH_ORANGE

        bp2 = btf.add_paragraph()
        bp2.alignment = PP_ALIGN.RIGHT
        bp2.text = "SIH Idea Submission"
        bp2.font.name = 'Arial'
        bp2.font.size = Pt(9)
        bp2.font.color.rgb = TEXT_MUTED

        # Footer
        footer = slide.shapes.add_textbox(Inches(0.8), Inches(7.0), Inches(11.733), Inches(0.4))
        ftf = footer.text_frame
        fp = ftf.paragraphs[0]
        fp.text = f"@SIH Idea submission - Template | Problem ID: 26042 | Slide {slide_num}"
        fp.font.name = 'Arial'
        fp.font.size = Pt(9)
        fp.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 1: TITLE PAGE
    # ==========================================
    slide1 = prs.slides.add_slide(blank_layout)

    # Top line
    top_line = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.18))
    top_line.fill.solid()
    top_line.fill.fore_color.rgb = PALASH_ORANGE
    top_line.line.color.rgb = PALASH_ORANGE

    # Event Title
    tb_event = slide1.shapes.add_textbox(Inches(0.8), Inches(0.6), Inches(11.733), Inches(0.8))
    tf_event = tb_event.text_frame
    p_event = tf_event.paragraphs[0]
    p_event.text = "SMART INDIA HACKATHON 2026"
    p_event.font.name = 'Arial'
    p_event.font.size = Pt(28)
    p_event.font.bold = True
    p_event.font.color.rgb = NAVY

    # Project Title Card (Navy Gradient Box)
    hero_box = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.733), Inches(1.8))
    hero_box.fill.solid()
    hero_box.fill.fore_color.rgb = NAVY
    hero_box.line.color.rgb = NAVY

    htf = hero_box.text_frame
    htf.word_wrap = True
    hp1 = htf.paragraphs[0]
    hp1.text = "PALASH-VANI (पलाश-वाणी / ᱯᱟᱞᱟᱥ ᱵᱟᱬᱤ)"
    hp1.font.name = 'Arial'
    hp1.font.size = Pt(24)
    hp1.font.bold = True
    hp1.font.color.rgb = RGBColor(255, 181, 159) # Light palash

    hp2 = htf.add_paragraph()
    hp2.text = "AI-Powered Vernacular Pedagogy & Real-Time Translation Tool for Mother Tongue-Based Primary Education"
    hp2.font.name = 'Arial'
    hp2.font.size = Pt(14)
    hp2.font.bold = True
    hp2.font.color.rgb = WHITE

    # Left Meta Info Card
    meta_box = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.5), Inches(7.4), Inches(3.2))
    meta_box.fill.solid()
    meta_box.fill.fore_color.rgb = CARD_BG
    meta_box.line.color.rgb = BORDER_COLOR

    mtf = meta_box.text_frame
    mtf.word_wrap = True

    items = [
        ("• Problem Statement ID:", " 26042"),
        ("• Problem Statement Title:", " AI-Powered Vernacular Pedagogy & Real-Time Translation Tool for MTB-MLE"),
        ("• Organization / Ministry:", " Govt. of Jharkhand (Dept. of Higher & Technical Education)"),
        ("• Theme:", " Smart Education"),
        ("• PS Category:", " Software"),
        ("• Target Languages:", " Ho (ᱦᱳ), Mundari (मुंडारी), Santhali (ᱥᱟᱱᱛᱟᱲᱤ with Ol Chiki) & Hindi")
    ]

    for idx, (label, val) in enumerate(items):
        p = mtf.paragraphs[0] if idx == 0 else mtf.add_paragraph()
        run1 = p.add_run()
        run1.text = label
        run1.font.bold = True
        run1.font.size = Pt(12)
        run1.font.color.rgb = NAVY

        run2 = p.add_run()
        run2.text = val
        run2.font.bold = False
        run2.font.size = Pt(12)
        run2.font.color.rgb = TEXT_DARK

    # Right Team Card
    team_box = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.4), Inches(3.5), Inches(4.133), Inches(3.2))
    team_box.fill.solid()
    team_box.fill.fore_color.rgb = PALASH_BG
    team_box.line.color.rgb = RGBColor(255, 212, 199)

    ttf = team_box.text_frame
    ttf.word_wrap = True
    tp_head = ttf.paragraphs[0]
    tp_head.text = "TEAM DETAILS"
    tp_head.font.bold = True
    tp_head.font.size = Pt(16)
    tp_head.font.color.rgb = PALASH_ORANGE

    t_items = [
        ("• Team ID:", " [Enter Team ID]"),
        ("• Team Name:", " [Enter Registered Team Name]"),
        ("• Team Leader:", " [Enter Team Leader Name]"),
        ("• Institution:", " [Enter College / Institute Name]"),
        ("• Solution Stage:", " Fully Functional Working Prototype (PWA + Offline Engine)")
    ]

    for label, val in t_items:
        p = ttf.add_paragraph()
        r1 = p.add_run()
        r1.text = label
        r1.font.bold = True
        r1.font.size = Pt(11)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = val
        r2.font.size = Pt(11)
        r2.font.color.rgb = TEXT_DARK

    # ==========================================
    # SLIDE 2: PROPOSED SOLUTION
    # ==========================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "IDEA TITLE: PALASH-VANI (पलाश-वाणी)", 2)

    # 3 Column Cards Layout
    card_width = Inches(3.7)
    card_height = Inches(5.3)
    card_y = Inches(1.4)

    # Card 1: Detailed Solution
    c1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), card_y, card_width, card_height)
    c1.fill.solid()
    c1.fill.fore_color.rgb = CARD_BG
    c1.line.color.rgb = BORDER_COLOR
    tf1 = c1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "1. PROPOSED SOLUTION"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = PALASH_ORANGE

    p_bullets = [
        ("Live Classroom Walkie-Talkie Bridge: ", "Real-time two-way voice translation between Hindi teachers & tribal students with sub-1.2s latency (<3s required)."),
        ("NIPUN FLN Curriculum Hub: ", "Step-by-step 40-min lesson plans & bilingual stories in Santhali, Mundari, and Ho with Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) & Devanagari scripts."),
        ("Bilingual Worksheet Studio: ", "1-click auto-generated printable vector A4 PDF activity sheets (matching, tracing, counting)."),
        ("Phonics Arena ('Bolo Aur Jeeto'): ", "Voice-interactive speech evaluation scoring tribal pronunciation with star badges.")
    ]
    for head, body in p_bullets:
        p = tf1.add_paragraph()
        r1 = p.add_run()
        r1.text = "• " + head
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = body
        r2.font.size = Pt(10)
        r2.font.color.rgb = TEXT_DARK

    # Card 2: How It Addresses Problem
    c2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.8), card_y, card_width, card_height)
    c2.fill.solid()
    c2.fill.fore_color.rgb = CARD_BG
    c2.line.color.rgb = BORDER_COLOR
    tf2 = c2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "2. HOW IT ADDRESSES THE PROBLEM"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = NAVY

    c2_bullets = [
        ("Eliminates Teacher Language Barrier: ", "Enables 20,000+ Hindi-trained teachers to conduct interactive mother-tongue dialogues immediately without prior tribal language training."),
        ("Prevents Tribal Learning Loss: ", "Protects 100,000+ children across 5,000+ schools from linguistic alienation in early Balvatika to Grade 3."),
        ("Bridges Vidya Pravesh & FLN: ", "Directly maps tribal cultural realia (Sal leaves, Madar drums, Mahua) to NIPUN Bharat learning outcomes."),
        ("Instant Classroom Utility: ", "1-tap quick action chips broadcast essential classroom instructions in authentic native voice.")
    ]
    for head, body in c2_bullets:
        p = tf2.add_paragraph()
        r1 = p.add_run()
        r1.text = "• " + head
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = body
        r2.font.size = Pt(10)
        r2.font.color.rgb = TEXT_DARK

    # Card 3: Innovation & Uniqueness
    c3 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.8), card_y, card_width, card_height)
    c3.fill.solid()
    c3.fill.fore_color.rgb = PALASH_BG
    c3.line.color.rgb = RGBColor(255, 212, 199)
    tf3 = c3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "3. INNOVATION & UNIQUENESS"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = PALASH_ORANGE

    c3_bullets = [
        ("100% Offline Zero-Latency Edge Engine: ", "Runs entirely on low-cost tablets (>=2GB RAM, Android 9+) without any internet connection in remote forest schools."),
        ("Ultra-Low Memory Footprint: ", "Consumes only ~135 MB RAM (well within 2GB hardware constraint)."),
        ("Authentic Multi-Script Engine: ", "Full native Unicode support for Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) & Warang Chiti alongside Devanagari."),
        ("Acoustic Hybrid Speech Synth: ", "Web Audio procedural phoneme synthesizer ensures authentic pronunciation without heavy cloud AI model costs.")
    ]
    for head, body in c3_bullets:
        p = tf3.add_paragraph()
        r1 = p.add_run()
        r1.text = "• " + head
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = body
        r2.font.size = Pt(10)
        r2.font.color.rgb = TEXT_DARK

    # ==========================================
    # SLIDE 3: TECHNICAL APPROACH
    # ==========================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "TECHNICAL APPROACH & ARCHITECTURE", 3)

    # Top: Tech Stack Grid
    tech_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.4), Inches(11.733), Inches(1.8))
    tech_box.fill.solid()
    tech_box.fill.fore_color.rgb = CARD_BG
    tech_box.line.color.rgb = BORDER_COLOR
    ttf = tech_box.text_frame
    ttf.word_wrap = True

    p = ttf.paragraphs[0]
    p.text = "CORE TECHNOLOGY STACK & FRAMEWORKS"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = PALASH_ORANGE

    techs = [
        ("• Frontend / PWA: ", "React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti (Optimized for 2GB Android Tablets)"),
        ("• NLP & Speech Engine: ", "Rule-Dictionary Morphological Engine, Web Speech API (STT), Web Audio Acoustic Phoneme Synthesizer (TTS)"),
        ("• Document Generation: ", "jsPDF + html2canvas (Printable high-contrast bilingual A4 vector worksheets)"),
        ("• Backend & Edge Sync: ", "FastAPI (Python 3.14), Uvicorn, Pydantic, IndexedDB Local Cache & Service Worker Offline Storage")
    ]
    for h, b in techs:
        p = ttf.add_paragraph()
        r1 = p.add_run()
        r1.text = h
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = b
        r2.font.size = Pt(10)
        r2.font.color.rgb = TEXT_DARK

    # Bottom: Implementation Pipeline Flow (4 Process Cards)
    p_y = Inches(3.4)
    p_w = Inches(2.75)
    p_h = Inches(3.3)
    p_gap = Inches(0.24)

    steps = [
        ("1. Audio Capture (STT)", "• Teacher Hindi voice or Student tribal speech recorded via Web Speech API.\n• Noise filtering & live waveform visualization on low-cost tablet mic.", GREEN, GREEN_BG),
        ("2. Fast Hybrid NLP (<5ms)", "• Bidirectional dictionary lookup with fuzzy morphological tokenization.\n• Automatic transliteration into Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) and Devanagari phonemes.", NAVY, CARD_BG),
        ("3. Sub-1.2s Audio TTS", "• Procedural acoustic speech synthesizer generates tribal speech output.\n• Large classroom teleprompter renders bilingual script for children.", PALASH_ORANGE, PALASH_BG),
        ("4. Edge Offline Storage", "• 100% offline functionality powered by IndexedDB & Service Worker cache.\n• Zero latency (<1.2s total end-to-end turnaround achieved).", GREEN, GREEN_BG)
    ]

    for idx, (title, desc, color, bg) in enumerate(steps):
        x = Inches(0.8) + idx * (p_w + p_gap)
        box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, p_y, p_w, p_h)
        box.fill.solid()
        box.fill.fore_color.rgb = bg
        box.line.color.rgb = color

        btf = box.text_frame
        btf.word_wrap = True
        p = btf.paragraphs[0]
        p.text = title
        p.font.bold = True
        p.font.size = Pt(12)
        p.font.color.rgb = color

        p2 = btf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10)
        p2.font.color.rgb = TEXT_DARK

    # ==========================================
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # ==========================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "FEASIBILITY AND VIABILITY ANALYSIS", 4)

    # Left: Feasibility Pillar Cards (3 Cards)
    f_w = Inches(5.6)
    f_h = Inches(1.6)
    f_x = Inches(0.8)

    pillars = [
        ("Technical Feasibility: Working Prototype Ready", "• Sub-1.2s voice-to-voice latency validated (surpassing the 3-second mandate).\n• Lightweight footprint (~135MB RAM) tested on low-spec Android 9+ tablets.\n• Zero external cloud API dependency for offline runtime.", GREEN, GREEN_BG),
        ("Operational Feasibility: Zero Teacher Training", "• Simple 1-tap push-to-talk Walkie-Talkie interface.\n• Pre-set one-click classroom action chips for immediate daily use.\n• 1-click printable PDF worksheets formatted for village school printers.", NAVY, CARD_BG),
        ("Economic & Financial Viability: Zero Cloud Cost", "• 100% open-source software stack with no recurring API license fees.\n• Utilizes existing tablet hardware deployed under Samagra Shiksha Abhiyan.", PALASH_ORANGE, PALASH_BG)
    ]

    for idx, (title, desc, color, bg) in enumerate(pillars):
        y = Inches(1.4) + idx * (f_h + Inches(0.2))
        box = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, f_x, y, f_w, f_h)
        box.fill.solid()
        box.fill.fore_color.rgb = bg
        box.line.color.rgb = color

        btf = box.text_frame
        btf.word_wrap = True
        p = btf.paragraphs[0]
        p.text = title
        p.font.bold = True
        p.font.size = Pt(12)
        p.font.color.rgb = color

        p2 = btf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10)
        p2.font.color.rgb = TEXT_DARK

    # Right: Challenges & Mitigation Strategies Table Card
    r_box = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.4), Inches(5.733), Inches(5.2))
    r_box.fill.solid()
    r_box.fill.fore_color.rgb = CARD_BG
    r_box.line.color.rgb = BORDER_COLOR

    rtf = r_box.text_frame
    rtf.word_wrap = True
    p = rtf.paragraphs[0]
    p.text = "POTENTIAL CHALLENGES & MITIGATION STRATEGIES"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = PALASH_ORANGE

    challenges = [
        ("Challenge: Low Digital NLP Resources for Ho, Mundari, Santhali", 
         "Mitigation: Built hybrid rule-morphology engine with 2,000+ curated FLN terms & authentic Ol Chiki/Warang Chiti transliteration maps."),
        ("Challenge: Zero Internet in Remote Forest Tribal Schools", 
         "Mitigation: 100% offline client-side architecture using IndexedDB & Service Worker cache. Initial 1-time sync downloads all bundles."),
        ("Challenge: Low Hardware Specs (2GB RAM Tablets)", 
         "Mitigation: Optimized lightweight procedural synthesis & client-side parsing consuming only ~135 MB RAM with zero memory leaks."),
        ("Challenge: District-Level Tribal Dialectal Nuances", 
         "Mitigation: Modular regional language packs for Kolhan, Santhal Parganas & Ranchi with teacher-customizable lesson creation.")
    ]

    for c, m in challenges:
        p = rtf.add_paragraph()
        r1 = p.add_run()
        r1.text = "⚠️ " + c + "\n"
        r1.font.bold = True
        r1.font.size = Pt(10)
        r1.font.color.rgb = RGBColor(180, 83, 9)
        r2 = p.add_run()
        r2.text = "✅ " + m
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = TEXT_DARK

    # ==========================================
    # SLIDE 5: IMPACT AND BENEFITS
    # ==========================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "IMPACT AND BENEFITS", 5)

    # Top: Impact Metrics Row (4 Numbers)
    m_w = Inches(2.75)
    m_h = Inches(1.3)
    m_gap = Inches(0.24)
    m_y = Inches(1.4)

    metrics = [
        ("5,000+", "Tribal Primary Schools Reached across Jharkhand", PALASH_ORANGE, PALASH_BG),
        ("100,000+", "Tribal Children Benefiting from MTB-MLE in Mother Tongue", GREEN, GREEN_BG),
        ("20,000+", "Teachers Empowered to Deliver Vernacular Instruction", NAVY, CARD_BG),
        ("< 1.2s", "Voice Latency (Exceeding SIH <3s Mandate)", PALASH_ORANGE, PALASH_BG)
    ]

    for idx, (num, label, color, bg) in enumerate(metrics):
        x = Inches(0.8) + idx * (m_w + m_gap)
        box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, m_y, m_w, m_h)
        box.fill.solid()
        box.fill.fore_color.rgb = bg
        box.line.color.rgb = color

        btf = box.text_frame
        btf.word_wrap = True
        p = btf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = num
        p.font.bold = True
        p.font.size = Pt(22)
        p.font.color.rgb = color

        p2 = btf.add_paragraph()
        p2.alignment = PP_ALIGN.CENTER
        p2.text = label
        p2.font.size = Pt(9.5)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_DARK

    # Bottom: 3 Pillar Benefit Cards
    b_y = Inches(2.9)
    b_w = Inches(3.7)
    b_h = Inches(3.8)

    benefits = [
        ("1. Social & Cultural Benefits", [
            ("Linguistic Preservation: ", "Revitalizes endangered indigenous languages (Ho, Mundari, Santhali) and authentic scripts like Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)."),
            ("Psychological Safety: ", "Eliminates language anxiety and humiliation for first-generation tribal learners."),
            ("Inclusive Pedagogy: ", "Integrates indigenous festivals (Sarhul, Karma, Baha, Sohrai) directly into primary school curriculum.")
        ], PALASH_BG, PALASH_ORANGE),
        ("2. Educational & Pedagogical Benefits", [
            ("FLN Mastery: ", "Accelerates NIPUN Bharat learning outcomes in foundational reading, writing, and numeracy (1-50 counting)."),
            ("Vidya Pravesh Alignment: ", "Pre-loaded 40-minute bilingual lesson scripts ease early childhood transition into formal schooling."),
            ("Empowered Teachers: ", "Eliminates dependency on scarce multilingual teachers through AI-assisted real-time voice translation.")
        ], CARD_BG, NAVY),
        ("3. Economic & Scalability Benefits", [
            ("Zero Hardware Upgrade Cost: ", "Runs on existing low-cost tablets (>=2GB RAM) already procured under government schemes."),
            ("Zero Cloud Subscription: ", "100% offline edge processing avoids expensive recurring cloud translation/STT billing."),
            ("Rapid Statewide Scalability: ", "Deployable instantly across all 24 districts of Jharkhand via lightweight PWA / APK.")
        ], GREEN_BG, GREEN)
    ]

    for idx, (title, b_list, bg, color) in enumerate(benefits):
        x = Inches(0.8) + idx * (b_w + Inches(0.3))
        box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, b_y, b_w, b_h)
        box.fill.solid()
        box.fill.fore_color.rgb = bg
        box.line.color.rgb = color

        btf = box.text_frame
        btf.word_wrap = True
        p = btf.paragraphs[0]
        p.text = title
        p.font.bold = True
        p.font.size = Pt(13)
        p.font.color.rgb = color

        for h, b in b_list:
            p = btf.add_paragraph()
            r1 = p.add_run()
            r1.text = "• " + h
            r1.font.bold = True
            r1.font.size = Pt(10)
            r1.font.color.rgb = NAVY
            r2 = p.add_run()
            r2.text = b
            r2.font.size = Pt(9.5)
            r2.font.color.rgb = TEXT_DARK

    # ==========================================
    # SLIDE 6: RESEARCH AND REFERENCES
    # ==========================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "RESEARCH AND REFERENCES", 6)

    # 2 Big Cards
    r_w = Inches(5.6)
    r_h = Inches(5.3)
    r_y = Inches(1.4)

    # Left: Policy & Educational Research
    c_left = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), r_y, r_w, r_h)
    c_left.fill.solid()
    c_left.fill.fore_color.rgb = CARD_BG
    c_left.line.color.rgb = BORDER_COLOR
    ltf = c_left.text_frame
    ltf.word_wrap = True
    p = ltf.paragraphs[0]
    p.text = "GOVERNMENT FRAMEWORKS & PEDAGOGICAL RESEARCH"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = PALASH_ORANGE

    research_items = [
        ("PALASH MTB-MLE Programme (Govt. of Jharkhand): ", "Field research reports demonstrating significant FLN gains when tribal children are taught in their home language."),
        ("National Education Policy (NEP 2020) §4.11-4.14: ", "Mandates mother tongue / home language as the primary medium of instruction until at least Grade 5."),
        ("NIPUN Bharat & Vidya Pravesh Guidelines (MoE): ", "National Mission on Foundational Literacy and Numeracy framework for early grade competence."),
        ("Central Institute of Indian Languages (CIIL Mysore): ", "Grammar, phonology, and morphological references for Austroasiatic (Munda) tribal language groups."),
        ("Guru Gomke Pt. Raghunath Murmu & Lako Bodra: ", "Original linguistic literature and character mapping standards for Ol Chiki and Warang Chiti scripts.")
    ]

    for h, b in research_items:
        p = ltf.add_paragraph()
        r1 = p.add_run()
        r1.text = "📖 " + h
        r1.font.bold = True
        r1.font.size = Pt(10)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = b
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = TEXT_DARK

    # Right: Technical Stack & Solution Prototype References
    c_right = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), r_y, r_w, r_h)
    c_right.fill.solid()
    c_right.fill.fore_color.rgb = PALASH_BG
    c_right.line.color.rgb = RGBColor(255, 212, 199)
    rtf = c_right.text_frame
    rtf.word_wrap = True
    p = rtf.paragraphs[0]
    p.text = "TECHNICAL REFERENCES & PROTOTYPE ARTIFACTS"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = NAVY

    tech_refs = [
        ("W3C Web Speech & Web Audio API Standards: ", "Low-latency client-side speech recognition & acoustic synthesis on constrained edge devices."),
        ("Unicode Consortium Standard (U+1C50 - U+1C7F): ", "Official Unicode encoding standards for Ol Chiki script rendering across web & mobile platforms."),
        ("Progressive Web App (PWA) Offline Cache Specs: ", "Service Worker & IndexedDB edge storage architectures for zero-bandwidth environments."),
        ("Live Working Prototype: ", "Full working software suite built with FastAPI Backend + React 19 / TypeScript Frontend."),
        ("GitHub Repository & Submission Deliverables: ", "Contains source code, offline bundle packs, printable worksheet generators, and video demonstration.")
    ]

    for h, b in tech_refs:
        p = rtf.add_paragraph()
        r1 = p.add_run()
        r1.text = "🔗 " + h
        r1.font.bold = True
        r1.font.size = Pt(10)
        r1.font.color.rgb = PALASH_ORANGE
        r2 = p.add_run()
        r2.text = b
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = TEXT_DARK

    # Save presentation
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

if __name__ == "__main__":
    create_sih_presentation()
