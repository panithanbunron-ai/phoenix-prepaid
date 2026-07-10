# กฎการเขียน Commit Message

ทุก commit ในโปรเจกต์นี้ต้องเขียนตามรูปแบบ [Conventional Commits](https://www.conventionalcommits.org/)
เพื่อให้ commit history อ่านง่าย เข้าใจตรงกันทั้งทีม และใช้ generate changelog ได้อัตโนมัติในอนาคต

---

## รูปแบบ

```
<type>(<scope>): <subject>

<body>            # ไม่บังคับ
```

| ส่วน       | คำอธิบาย                                                                                  |
|-----------|--------------------------------------------------------------------------------------------|
| `type`    | ประเภทของการเปลี่ยนแปลง **(บังคับ)** — ดูตารางด้านล่าง                                            |
| `scope`   | ส่วนของโค้ดที่แก้ เช่น `auth`, `api`, `workflow` (ไม่บังคับ)                                |
| `subject` | อธิบายสั้น ๆ ว่าทำอะไร ขึ้นต้นด้วยตัวพิมพ์เล็ก ไม่มีจุดปิดท้าย ใช้ imperative mood (`add` ไม่ใช่ `added`/`adds`) |

---

## ประเภท (type) ที่ใช้ได้

| type       | ใช้เมื่อ                                                        |
|------------|--------------------------------------------------------------|
| `feat`     | เพิ่มฟีเจอร์ใหม่                                                  |
| `fix`      | แก้บั๊ก                                                         |
| `chore`    | งานเบื้องหลังที่ไม่กระทบ logic เช่น setup tooling, config, deps     |
| `test`     | เพิ่ม/แก้ไข test                                                |
| `docs`     | แก้เอกสารเท่านั้น                                                |
| `refactor` | ปรับโครงสร้างโค้ดโดยไม่เปลี่ยน behavior                            |
| `style`    | แก้ format/lint (เว้นวรรค, เครื่องหมาย ฯลฯ) ไม่กระทบ logic        |
| `perf`     | ปรับปรุงประสิทธิภาพ                                              |
| `ci`       | แก้ pipeline/workflow (GitHub Actions ฯลฯ)                    |

---

## ตัวอย่าง

```
feat(auth): add OTP verification for prepaid top-up
fix(api): correct balance calculation on refund
chore: update eslint config and prettier rules
docs: add commit message convention guide
ci: fetch full history in auto-pr workflow
```

---

## ข้อห้าม

- ❌ ห้ามเขียน subject กำกวม เช่น `update`, `fix bug`, `wip`, `test push`
  (ดู commit เก่าอย่าง `testpushh`, `testpushorigin` เป็นตัวอย่างที่ไม่ควรทำซ้ำ)
- ❌ ห้ามรวมหลายการเปลี่ยนแปลงที่ไม่เกี่ยวข้องกันไว้ใน commit เดียว — แยกเป็นคนละ commit ตาม type/scope
- ✅ ถ้า commit มีผลกระทบใหญ่ (breaking change) ให้เพิ่ม footer:

  ```
  BREAKING CHANGE: <รายละเอียด>
  ```

---

## Body (ถ้าจำเป็น)

ใช้เมื่อ subject ไม่สามารถอธิบาย **"ทำไม"** ถึงแก้แบบนี้ (motivation/context)
ไม่ใช่แค่ **"ทำอะไร"** เพราะ diff บอกอยู่แล้วว่าทำอะไร
