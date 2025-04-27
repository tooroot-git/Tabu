import { chromium } from "playwright"

export async function runOrderAutomation(order: any): Promise<Buffer> {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto("https://target-taboo-website.com/login")

    // כניסה ראשונית אם צריך (להוסיף לוגין אם יש בעתיד)

    // מילוי טפסים לפי סוג החיפוש
    if (order.block && order.parcel) {
      await page.click("text=חיפוש לפי גוש וחלקה")
      await page.fill('input[name="block"]', order.block)
      await page.fill('input[name="parcel"]', order.parcel)
      if (order.subparcel) {
        await page.fill('input[name="subparcel"]', order.subparcel)
      }
    } else if (order.street && order.city && order.house_number) {
      await page.click("text=חיפוש לפי כתובת")
      await page.fill('input[name="city"]', order.city)
      await page.fill('input[name="street"]', order.street)
      await page.fill('input[name="house_number"]', order.house_number)
    } else {
      throw new Error("Missing search parameters")
    }

    // בחירת סוג נסח
    if (order.service_type === "regular") {
      await page.click("text=נסח רגיל")
    } else if (order.service_type === "historical") {
      await page.click("text=נסח היסטורי")
    } else if (order.service_type === "concentrated") {
      await page.click("text=נסח מרוכז")
    }

    // לחיצה על כפתור הזמנה
    await page.click("text=הזמן עכשיו")

    // המתנה לסיום והורדת הקובץ
    await page.waitForTimeout(5000) // להמתין כמה שניות עד שהקובץ מוכן

    const pdfBuffer = await page.pdf({ format: "A4" })

    await browser.close()

    return pdfBuffer
  } catch (err) {
    await browser.close()
    throw err
  }
}
