# 🎨 SVG Avatar Rigging Guide

This guide explains how to design, layer, tag, and import custom vector SVG avatars into SVG-TUBER ULTIMATE.

---

## 🛠️ SVG Design & Layer Naming Convention

SVG-TUBER automatically binds tracking transforms and facial morphing to specific XML `id` attributes on SVG groups (`<g>`) and path elements.

### Required & Recognized Layer IDs

| Element ID | Description | Applied Motion |
|---|---|---|
| `#head_base_group` | Main head container containing face base | Head Yaw/Pitch/Roll, Position X/Y, Squish & Stretch |
| `#eyebrows_group` | Eyebrow vector paths | Eyebrow raise offset ($-\Delta Y$) |
| `#eye_left_group` | Left eye container | Eye position tracking & pupil parallax |
| `#eye_right_group` | Right eye container | Eye position tracking & pupil parallax |
| `#eye_left_closed` | Left closed/wink eye path | Toggled visible when left eye blinks |
| `#iris_left` | Left open iris/pupil path | Toggled visible when left eye is open |
| `#eye_right_closed` | Right closed/wink eye path | Toggled visible when right eye blinks |
| `#iris_right` | Right open iris/pupil path | Toggled visible when right eye is open |
| `#nose_group` | Nose vector element | Nose parallax offset |
| `#mouth_group` | Mouth container element | Mouth position tracking & phoneme morphing |
| `#mouth_closed` | Neutral closed mouth path | Displayed when mouth is closed |
| `#mouth_smile` | Smiling mouth path | Displayed during smile/formant phonemes `E`, `I` |
| `#mouth_open_wide` | Open wide mouth path | Displayed during loud speaking / formant phoneme `A` |
| `#mouth_o` | Small circular mouth path | Displayed during formant phoneme `O`, `U` |
| `#hair_front_group` | Front hair strands / bangs | Hair spring physics sway |
| `#hair_back_group` | Back hair strands | Counter-sway hair physics |
| `#ears_group` | Ears or ear accessories | Ear spring bounce physics |
| `#body_group` | Shoulders / body base | Body sway counter-rotation |

---

## 🌟 Expression Layer IDs

To trigger custom facial expression overlays (e.g. blush, angry mark, tear drops), give the expression elements these IDs:

- `#expr_blush`: Blush cheek highlights
- `#expr_angry`: Anger vein popping symbol
- `#expr_shock`: Electro shock lines / wide eyes
- `#expr_tears`: Tear drop paths
- `#expr_stars`: Star eye highlights
- `#expr_hearts`: Heart eye highlights

---

## 📥 Importing via Rigging Studio UI

1. Open **SVG-TUBER** and click **Import & Rig Custom SVG** in the Control Dashboard.
2. Drag and drop your `.svg` vector file into the studio.
3. The **Layer Inspector** will automatically scan and list all node IDs found in your SVG.
4. Select the matching ID tags for head, hair, eyes, mouth, and ears.
5. Click **Save & Import Puppet** to instantly activate your custom avatar!

---

## 💡 Best Practices for Vector Designers

1. **ViewBox Specs**: Use an SVG viewBox of `0 0 800 900` with the head centered around coordinates `(400, 360)`.
2. **Group Organization**: Keep layer groups clean and nested logically (e.g., `#head_base_group` containing eyes, eyebrows, nose, mouth).
3. **Optimized SVG Output**: Clean up unnecessary Illustrator/Inkscape metadata using `SVGO` before importing for maximum 60 FPS performance.
