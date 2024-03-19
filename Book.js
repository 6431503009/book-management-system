// ฟังก์ชันสร้างออบเจกต์หนังสือใหม่
function createBook(title, author, publicationYear, price) {
  return {
    title,
    author,
    publicationYear,
    price,
  };
}

// ฟังก์ชันตรวจสอบข้อมูลนำเข้า
function validateInput(value, pattern, errorMessage) {
  if (!pattern.test(value)) {
    alert(errorMessage);
    return false;
  }
  return true;
}

// ฟังก์ชันเพิ่มหนังสือใหม่
function addBook() {
  const title = prompt('กรอก "ชื่อ" หนังสือ (Fill "Title" of book): ');
  const titlePattern = /^[a-zA-Z0-9ก-๙\s]+$/u;
  const titleErrorMessage = "ชื่อหนังสือควรเป็นตัวอักษรและตัวเลขเท่านั้น";
  if (!validateInput(title, titlePattern, titleErrorMessage)) return;

  const author = prompt('กรอก "ผู้เขียน" หนังสือ (Fill "Author" of book)');
  const authorPattern = /^[\p{L}\s]+$/u;
  const authorErrorMessage = "ชื่อผู้เขียนควรเป็นตัวอักษรไทยและอังกฤษเท่านั้น";
  if (!validateInput(author, authorPattern, authorErrorMessage)) return;

  const publicationYear = prompt(
    'กรอก "ปีที่พิมพ์" หนังสือ (Fill "Publication Year" of book): '
  );
  const publicationYearPattern = /^\d{4}$/;
  const publicationYearErrorMessage =
    "ปีที่พิมพ์ควรเป็นตัวเลขเพียงอย่างเดียวเเละมีจำนวนเพียง4ตัวเท่านั้น";
  if (
    !validateInput(
      publicationYear,
      publicationYearPattern,
      publicationYearErrorMessage
    )
  )
    return;

  const price = prompt('กรอก "ราคา" หนังสือ (Fill "Price" of book): ');
  const pricePattern = /^\d+(\.\d{1,2})?$/;
  const priceErrorMessage =
    "ราคาควรเป็นตัวเลขอย่างเดียว หรือตัวเลขทศนิยม (ถ้ามี) สูงสุด 2 ตำแหน่ง";
  if (!validateInput(price, pricePattern, priceErrorMessage)) return;

  const newBook = createBook(title, author, publicationYear, price);
  books.push(newBook);

  alert("เพิ่มหนังสือเสร็จสมบูรณ์");
}

function editBook() {
  const bookName = prompt("กรุณาใส่ชื่อหนังสือที่ต้องการแก้ไข:");
  let found = false;

  // ค้นหาหนังสือที่ต้องการแก้ไขจากชื่อของหนังสือ
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === bookName) {
      found = true;
      const updatedTitle = prompt(`ชื่อหนังสือ (เดิม: ${books[i].title}):`);
      const titlePattern = /^[\p{L}\d\s]+$/u;
      const titleErrorMessage =
        "ชื่อหนังสือควรเป็นตัวอักษรไทย, อักษรอังกฤษ และตัวเลขเท่านั้น";
      if (!validateInput(updatedTitle, titlePattern, titleErrorMessage)) return;

      const updatedAuthor = prompt(`ผู้เขียน (เดิม: ${books[i].author}):`);
      const authorPattern = /^[\p{L}\s]+$/u;
      const authorErrorMessage =
        "ชื่อผู้เขียนควรเป็นตัวอักษรไทยและอังกฤษเท่านั้น";
      if (!validateInput(updatedAuthor, authorPattern, authorErrorMessage))
        return;

      const updatedPublicationYear = prompt(
        `ปีที่พิมพ์ (เดิม: ${books[i].publicationYear}):`
      );
      const publicationYearPattern = /^\d{4}$/;
      const publicationYearErrorMessage =
        "ปีที่พิมพ์ควรเป็นตัวเลขเพียงอย่างเดียวเเละมีจำนวนเพียง4ตัวเท่านั้น";
      if (
        !validateInput(
          updatedPublicationYear,
          publicationYearPattern,
          publicationYearErrorMessage
        )
      )
        return;

      const updatedPrice = prompt(`ราคา (เดิม: ${books[i].price}):`);
      const pricePattern = /^\d+(\.\d{1,2})?$/;
      const priceErrorMessage =
        "ราคาควรเป็นตัวเลขอย่างเดียว หรือตัวเลขทศนิยม (ถ้ามี) สูงสุด 2 ตำแหน่ง";

      if (!validateInput(updatedPrice, pricePattern, priceErrorMessage)) return;

      const updatedBook = createBook(
        updatedTitle || books[i].title,
        updatedAuthor || books[i].author,
        updatedPublicationYear || books[i].publicationYear,
        updatedPrice || books[i].price
      );

      // อัปเดตข้อมูลในตัวแปร books โดยตรง
      books[i] = updatedBook;
      alert("แก้ไขหนังสือเรียบร้อยแล้ว!");
      break;
    }
  }

  // หากไม่พบหนังสือที่ต้องการแก้ไข
  if (!found) {
    alert("ไม่พบหนังสือที่ต้องการแก้ไข");
  }
}

// ฟังก์ชันลบหนังสือ
function deleteBook() {
  const index = prompt("กรุณาเลือกหนังสือที่ต้องการลบโดยพิมพ์ชื่อของหนังสือ:");
  let found = false;

  // ค้นหาหนังสือที่ต้องการลบจากอาร์เรย์ books
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === index) {
      // หากพบหนังสือที่ต้องการลบ
      found = true;
      const deletedBook = books.splice(i, 1);
      alert(`ลบหนังสือ "${deletedBook[0].title}" เรียบร้อยแล้ว!`);
      break;
    }
  }

  // หากไม่พบหนังสือที่ต้องการลบ
  if (!found) {
    alert("ไม่พบหนังสือที่ต้องการลบ");
  }
}

// ฟังก์ชันแสดงรายการหนังสือ
function viewBooks() {
  if (books.length === 0) {
    alert("ยังไม่มีหนังสือในรายการ");
  } else {
    let bookList = "รายการหนังสือ:\n";
    books.forEach((book, index) => {
      bookList += `${index + 1}. ${book.title} โดย ${
        book.author
      }, ปีที่พิมพ์: ${book.publicationYear}, ราคา: ${book.price} บาท\n`;
    });
    alert(bookList);
  }
}

// ฟังก์ชันแสดงเมนูหลัก
function showMenu() {
  const choice = prompt(
    "เลือกรายการที่ต้องการ (1: เพิ่มหนังสือ, 2: แสดงรายการหนังสือ, 3: แก้ไขหนังสือ, 4: ลบหนังสือ, 0: ออกจากระบบ):"
  );

  switch (choice) {
    case "1":
      addBook();
      break;
    case "2":
      viewBooks();
      break;
    case "3":
      editBook();
      break;
    case "4":
      deleteBook();
      break;
    case "0":
      alert("ออกจากระบบ");
      return;
    default:
      alert("กรุณาเลือกรายการที่ถูกต้อง");
  }

  showMenu();
}

// อาร์เรย์เก็บข้อมูลหนังสือ
const books = [];

// เรียกใช้งานเมนูหลัก
showMenu();