import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs("public/showcase", exist_ok=True)

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_MONO = "/System/Library/Fonts/Menlo.ttc"

def make_browser_frame(content_img, title="https://store.example.com", width=860, height=540):
    frame = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(frame)
    
    bg_color = (18, 22, 26, 250)
    border_color = (255, 255, 255, 45)
    corner_radius = 16
    titlebar_h = 44
    
    draw.rounded_rectangle([0, 0, width, height], radius=corner_radius, fill=bg_color, outline=border_color, width=1)
    
    btn_y = 22
    draw.ellipse([18, btn_y - 6, 30, btn_y + 6], fill=(255, 95, 86, 255))
    draw.ellipse([38, btn_y - 6, 50, btn_y + 6], fill=(255, 189, 46, 255))
    draw.ellipse([58, btn_y - 6, 70, btn_y + 6], fill=(39, 201, 63, 255))
    
    url_box_w = 420
    url_box_x = (width - url_box_w) // 2
    draw.rounded_rectangle([url_box_x, 9, url_box_x + url_box_w, 35], radius=6, fill=(10, 13, 16, 220), outline=(255, 255, 255, 24), width=1)
    
    try:
        font_url = ImageFont.truetype(FONT_REGULAR, 12)
        font_lock = ImageFont.truetype(FONT_BOLD, 10)
    except:
        font_url = ImageFont.load_default()
        font_lock = ImageFont.load_default()
        
    draw.text((url_box_x + 14, 14), "🔒", fill=(120, 140, 150), font=font_lock)
    draw.text((url_box_x + 36, 14), title, fill=(200, 215, 225), font=font_url)
    
    target_w = width - 4
    target_h = height - titlebar_h - 2
    
    cw, ch = content_img.size
    aspect_target = target_w / target_h
    aspect_content = cw / ch
    
    if aspect_content > aspect_target:
        new_w = int(ch * aspect_target)
        crop_box = ((cw - new_w) // 2, 0, (cw + new_w) // 2, ch)
    else:
        new_h = int(cw / aspect_target)
        crop_box = (0, 0, cw, new_h)
        
    cropped = content_img.crop(crop_box).resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    mask = Image.new("L", (target_w, target_h), 255)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rectangle([0, 0, target_w, target_h - corner_radius], fill=255)
    mask_draw.rounded_rectangle([0, 0, target_w, target_h], radius=corner_radius, fill=255)
    
    frame.paste(cropped, (2, titlebar_h), mask)
    return frame

def make_phone_frame(content_img, width=250, height=500):
    frame = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(frame)
    
    corner_radius = 40
    draw.rounded_rectangle([0, 0, width, height], radius=corner_radius, fill=(12, 15, 18, 255), outline=(255, 255, 255, 60), width=2)
    
    screen_margin = 8
    sw = width - screen_margin * 2
    sh = height - screen_margin * 2
    
    cw, ch = content_img.size
    aspect_target = sw / sh
    aspect_content = cw / ch
    
    if aspect_content > aspect_target:
        new_w = int(ch * aspect_target)
        crop_box = ((cw - new_w) // 2, 0, (cw + new_w) // 2, ch)
    else:
        new_h = int(cw / aspect_target)
        crop_box = (0, 0, cw, new_h)
        
    screen_img = content_img.crop(crop_box).resize((sw, sh), Image.Resampling.LANCZOS)
    
    mask = Image.new("L", (sw, sh), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, sw, sh], radius=corner_radius - screen_margin, fill=255)
    
    frame.paste(screen_img, (screen_margin, screen_margin), mask)
    
    di_w, di_h = 74, 18
    di_x = (width - di_w) // 2
    draw.rounded_rectangle([di_x, 14, di_x + di_w, 14 + di_h], radius=9, fill=(0, 0, 0, 255))
    
    return frame

def add_drop_shadow(img, offset=(0, 25), blur=40, shadow_color=(0, 0, 0, 200)):
    total_w = img.width + blur * 2 + abs(offset[0])
    total_h = img.height + blur * 2 + abs(offset[1])
    
    s_mask = Image.new("L", (img.width, img.height), 0)
    alpha = img.split()[-1]
    s_mask.paste(alpha)
    
    shadow_layer = Image.new("RGBA", (total_w, total_h), shadow_color)
    paste_x = blur + max(0, offset[0])
    paste_y = blur + max(0, offset[1])
    
    canvas_mask = Image.new("L", (total_w, total_h), 0)
    canvas_mask.paste(s_mask, (paste_x, paste_y))
    canvas_mask = canvas_mask.filter(ImageFilter.GaussianBlur(blur))
    
    shadow_final = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
    shadow_final.paste(shadow_layer, (0, 0), canvas_mask)
    
    img_x = blur + max(0, -offset[0])
    img_y = blur + max(0, -offset[1])
    shadow_final.paste(img, (img_x, img_y), img)
    
    return shadow_final, (img_x, img_y)

def create_banner(title, subtitle, main_mockup, phone_mockup=None, accent_color=(0, 240, 200)):
    W, H = 1200, 900
    canvas = Image.new("RGBA", (W, H), (11, 14, 17, 255))
    draw = ImageDraw.Draw(canvas)
    
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([W//2 - 420, -80, W//2 + 420, 380], fill=(*accent_color[:3], 45))
    glow_draw.ellipse([W//2 - 480, H - 320, W//2 + 480, H + 120], fill=(16, 22, 28, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(95))
    canvas.paste(glow, (0, 0), glow)
    
    for x in range(0, W, 40):
        for y in range(0, H, 40):
            canvas.putpixel((x, y), (255, 255, 255, 14))
            
    try:
        font_sub = ImageFont.truetype(FONT_MONO, 14)
        font_title = ImageFont.truetype(FONT_BOLD, 74)
    except:
        font_sub = ImageFont.load_default()
        font_title = ImageFont.load_default()
        
    sub_bbox = draw.textbbox((0, 0), subtitle, font=font_sub)
    sub_w = sub_bbox[2] - sub_bbox[0]
    draw.text(((W - sub_w) // 2, 55), subtitle, fill=(*accent_color[:3], 230), font=font_sub)
    
    title_bbox = draw.textbbox((0, 0), title, font=font_title)
    title_w = title_bbox[2] - title_bbox[0]
    draw.text(((W - title_w) // 2, 85), title, fill=(245, 248, 250, 255), font=font_title)
    
    shadowed_browser, _ = add_drop_shadow(main_mockup, offset=(0, 30), blur=45, shadow_color=(0, 0, 0, 210))
    bx = (W - main_mockup.width) // 2 - (60 if phone_mockup else 0)
    by = 220
    canvas.paste(shadowed_browser, (bx - 45, by - 45), shadowed_browser)
    
    if phone_mockup:
        shadowed_phone, _ = add_drop_shadow(phone_mockup, offset=(10, 25), blur=35, shadow_color=(0, 0, 0, 230))
        px = W - phone_mockup.width - 60
        py = H - phone_mockup.height - 65
        canvas.paste(shadowed_phone, (px - 35, py - 35), shadowed_phone)
        
    return canvas.convert("RGB")

brain_dir = "/Users/brent/.gemini/antigravity-ide/brain/3d6397aa-0aec-428e-908f-c9838811befa"

# ==========================================
# 1. MyMini
# ==========================================
print("Generating MyMini...")
mymini_raw = Image.open(f"{brain_dir}/mymini_hero_1792980597954.png").convert("RGBA")
# Crop hero section
mymini_crop = mymini_raw.crop((120, 60, mymini_raw.width - 120, int(mymini_raw.height * 0.88)))
browser_mymini = make_browser_frame(mymini_crop, title="mymini.io • 3D Customizer & Scale Platform", width=860, height=540)

# Phone mockup focusing on the 3D car model customizer
mymini_phone_crop = mymini_raw.crop((int(mymini_raw.width * 0.50), int(mymini_raw.height * 0.14), int(mymini_raw.width * 0.85), int(mymini_raw.height * 0.82)))
phone_mymini = make_phone_frame(mymini_phone_crop, width=250, height=490)

banner_mymini = create_banner(
    title="MYMINI",
    subtitle="CUSTOM 3D CONFIGURATOR · ECOMMERCE",
    main_mockup=browser_mymini,
    phone_mockup=phone_mymini,
    accent_color=(255, 104, 1) # MyMini Signature Orange
)
banner_mymini.save("public/showcase/mymini.webp", "WEBP", quality=92)
print("Saved public/showcase/mymini.webp")

# ==========================================
# 2. Futurama
# ==========================================
print("Generating Futurama...")
futurama_raw = Image.open(f"{brain_dir}/futurama_hero_1792981108417.png").convert("RGBA")
futurama_crop = futurama_raw.crop((0, 0, futurama_raw.width, int(futurama_raw.height * 0.88)))
browser_futurama = make_browser_frame(futurama_crop, title="futurama.co.za • Optics, Outdoor & Tech Gear", width=860, height=540)

# Modern audit / ROAS analytics overlay card
audit_card = Image.new("RGBA", (300, 420), (0, 0, 0, 0))
adraw = ImageDraw.Draw(audit_card)
adraw.rounded_rectangle([0, 0, 300, 420], radius=20, fill=(13, 17, 22, 248), outline=(0, 240, 200, 120), width=1)
try:
    f_badge = ImageFont.truetype(FONT_MONO, 11)
    f_stat = ImageFont.truetype(FONT_BOLD, 36)
    f_label = ImageFont.truetype(FONT_REGULAR, 12)
    f_sub = ImageFont.truetype(FONT_BOLD, 14)
except:
    f_badge = ImageFont.load_default()
    f_stat = ImageFont.load_default()
    f_label = ImageFont.load_default()
    f_sub = ImageFont.load_default()

adraw.text((22, 22), "ADS AUDIT & RESTRUCTURE", fill=(0, 240, 200), font=f_badge)
adraw.text((22, 44), "FUTURAMA SCALE", fill=(255, 255, 255), font=f_sub)
adraw.line([22, 72, 278, 72], fill=(255, 255, 255, 30), width=1)

adraw.text((22, 88), "+48%", fill=(0, 240, 200), font=f_stat)
adraw.text((22, 130), "ROAS EFFICIENCY GAIN", fill=(160, 175, 185), font=f_label)

adraw.text((22, 168), "-34%", fill=(255, 140, 100), font=f_stat)
adraw.text((22, 210), "WASTED AD SPEND PRUNED", fill=(160, 175, 185), font=f_label)

adraw.text((22, 250), "META + GOOGLE ENGINE", fill=(255, 255, 255), font=f_sub)
adraw.text((22, 274), "Catalog feed restructuring, CAPI tracking,", fill=(160, 175, 185), font=f_label)
adraw.text((22, 292), "and high-intent audience segmentation.", fill=(160, 175, 185), font=f_label)

adraw.rounded_rectangle([22, 345, 278, 385], radius=8, fill=(0, 240, 200, 30), outline=(0, 240, 200, 140), width=1)
adraw.text((42, 356), "ACCOUNT CLEANUP COMPLETE", fill=(0, 240, 200), font=f_badge)

banner_futurama = create_banner(
    title="FUTURAMA",
    subtitle="OUTDOOR & OPTICS · ADS AUDIT & SCALE",
    main_mockup=browser_futurama,
    phone_mockup=audit_card,
    accent_color=(0, 240, 200) # Streamline Cyan
)
banner_futurama.save("public/showcase/futurama.webp", "WEBP", quality=92)
print("Saved public/showcase/futurama.webp")

# ==========================================
# 3. Camping Fridge
# ==========================================
print("Generating Camping Fridge...")
fridge_raw = Image.open(f"{brain_dir}/campingfridge_hero_1792981249263.png").convert("RGBA")
# Base scenery crop
scenery = fridge_raw.crop((0, int(fridge_raw.height * 0.22), fridge_raw.width, fridge_raw.height))

# Construct a high-end active storefront view
store_w, store_h = 1600, 950
storefront = Image.new("RGBA", (store_w, store_h), (14, 18, 22, 255))
# Place scenery as hero banner
scenery_h = 750
scenery_resized = scenery.resize((store_w, scenery_h), Image.Resampling.LANCZOS)
storefront.paste(scenery_resized, (0, 90))

# Gradient overlay from dark to transparent
grad = Image.new("RGBA", (store_w, 280), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(grad)
for y in range(280):
    alpha = int(255 * (1 - (y / 280)))
    gdraw.line([(0, y), (store_w, y)], fill=(14, 18, 22, alpha))
storefront.paste(grad, (0, 90), grad)

# Storefront Navbar
s_draw = ImageDraw.Draw(storefront)
s_draw.rectangle([0, 0, store_w, 90], fill=(12, 16, 20, 255))
s_draw.line([0, 90, store_w, 90], fill=(255, 255, 255, 25), width=1)

try:
    f_cf_brand = ImageFont.truetype(FONT_BOLD, 22)
    f_cf_nav = ImageFont.truetype(FONT_BOLD, 12)
    f_cf_hero = ImageFont.truetype(FONT_BOLD, 48)
    f_cf_hero_sub = ImageFont.truetype(FONT_REGULAR, 18)
    f_cf_btn = ImageFont.truetype(FONT_BOLD, 14)
except:
    f_cf_brand = ImageFont.load_default()
    f_cf_nav = ImageFont.load_default()
    f_cf_hero = ImageFont.load_default()
    f_cf_hero_sub = ImageFont.load_default()
    f_cf_btn = ImageFont.load_default()

s_draw.text((60, 32), "CAMPING FRIDGE SA", fill=(255, 255, 255), font=f_cf_brand)
s_draw.text((420, 38), "12V PORTABLE FRIDGES", fill=(255, 255, 255), font=f_cf_nav)
s_draw.text((640, 38), "DUAL ZONE", fill=(180, 195, 205), font=f_cf_nav)
s_draw.text((790, 38), "SOLAR & BATTERIES", fill=(180, 195, 205), font=f_cf_nav)
s_draw.text((1000, 38), "EXPEDITION GEAR", fill=(180, 195, 205), font=f_cf_nav)

s_draw.rounded_rectangle([1360, 24, 1530, 66], radius=21, fill=(74, 222, 128), outline=(74, 222, 128), width=1)
s_draw.text((1400, 37), "SHOP NOW", fill=(12, 16, 20), font=f_cf_btn)

# Hero Headline overlay on scenery
s_draw.text((80, 200), "BUILT FOR THE UNTAMED WILD.", fill=(255, 255, 255), font=f_cf_hero)
s_draw.text((80, 265), "South Africa's dedicated 12V expedition refrigeration specialists.", fill=(220, 230, 235), font=f_cf_hero_sub)
s_draw.text((80, 295), "Dometic CFX · SnoMaster · National Luna · Sub-second Headless Shopify Plus Architecture.", fill=(74, 222, 128), font=f_cf_hero_sub)

# Floating Product feature card on bottom left of hero
s_draw.rounded_rectangle([80, 420, 520, 560], radius=16, fill=(12, 16, 20, 230), outline=(255, 255, 255, 40), width=1)
s_draw.text((105, 445), "DOMETIC CFX3 55 DUAL ZONE", fill=(255, 255, 255), font=ImageFont.truetype(FONT_BOLD, 16))
s_draw.text((105, 475), "Heavy-duty VMSO3 compressor cooling down to -22°C.", fill=(160, 175, 185), font=ImageFont.truetype(FONT_REGULAR, 12))
s_draw.text((105, 510), "R14,999  ·  IN STOCK  ·  FAST NATIONWIDE COURIER", fill=(74, 222, 128), font=ImageFont.truetype(FONT_MONO, 11))

browser_fridge = make_browser_frame(storefront, title="campingfridge.co.za • South Africa 12V Expedition Store", width=860, height=540)

# Phone mockup with mobile product page
phone_store = Image.new("RGBA", (450, 900), (14, 18, 22, 255))
p_draw = ImageDraw.Draw(phone_store)
p_scenery = scenery.resize((450, 400), Image.Resampling.LANCZOS)
phone_store.paste(p_scenery, (0, 0))
p_draw.rectangle([0, 380, 450, 900], fill=(14, 18, 22, 255))
p_draw.text((30, 420), "Camping Fridge SA", fill=(74, 222, 128), font=ImageFont.truetype(FONT_MONO, 12))
p_draw.text((30, 445), "Dometic CFX3 55", fill=(255, 255, 255), font=ImageFont.truetype(FONT_BOLD, 26))
p_draw.text((30, 485), "R 14,999.00", fill=(255, 255, 255), font=ImageFont.truetype(FONT_BOLD, 22))
p_draw.text((30, 525), "Instant mobile checkout with PayFast & Ozow.", fill=(160, 175, 185), font=ImageFont.truetype(FONT_REGULAR, 14))
p_draw.rounded_rectangle([30, 580, 420, 640], radius=12, fill=(74, 222, 128))
p_draw.text((140, 598), "ADD TO EXPEDITION", fill=(12, 16, 20), font=ImageFont.truetype(FONT_BOLD, 15))

phone_fridge = make_phone_frame(phone_store, width=250, height=490)

banner_fridge = create_banner(
    title="CAMPING FRIDGE",
    subtitle="OUTDOOR EXPEDITION · ECOMMERCE STOREFRONT",
    main_mockup=browser_fridge,
    phone_mockup=phone_fridge,
    accent_color=(74, 222, 128) # Adventure green accent
)
banner_fridge.save("public/showcase/camping-fridge.webp", "WEBP", quality=92)
print("Saved public/showcase/camping-fridge.webp")

print("All 3 showcase banners updated successfully!")
