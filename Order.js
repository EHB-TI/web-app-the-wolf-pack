const fs = require('fs');
const PDFDocument = require('pdfkit');

class Order {
  constructor(customer, order) {
    this.customer = customer;
    this.order = order;
  }

  generatePDF() {
    let doc = new PDFDocument({ margin: 50 });
	this.generateHeader(doc);
	this.generateCustomerInformation(doc);
	this.generateOrderTable(doc);
	this.generateFooter(doc);
    doc.pipe(fs.createWriteStream('order.pdf'));
	doc.end();
  }

  generateCustomerInformation(doc) {
	doc.fillColor("#444444").fontSize(20).text("Order", 50, 160);
    this.generateHr(doc, 185);
	doc.fontSize(10).text(`Order Date: ${this.formatDate(new Date())}`, 50, 200)
	   .text(`Naam: ${this.customer.name}`, 50, 215)
	   .text(`Email: ${this.customer.email}`, 50, 230)
	   .moveDown();
	this.generateHr(doc, 250);
 }

  generateHeader(doc) {
	doc.image('Focus.jpg', 50, 65, { width: 70 })
		.fillColor('#444444')
		.fontSize(15)
		.text('Cinema Focus', 130, 72)
		.fontSize(10)
		.text('Zonnebloemstraat 9', 200, 65, { align: 'right' })
		.text('9500 Geraardsbergen', 200, 80, { align: 'right' })
		.moveDown();
  }

  generateOrderTable(doc) {
	let i,orderTableTop = 300;
	doc.font("Helvetica-Bold");
	this.generateTableRow(
	  doc,
	  orderTableTop,
	  "Film",
	  "Zaal",
	  "Datum",
	  "Uur",
	  "Kostprijs",
	  "Hoeveelheid",
	  "Totaal"
	);
	this.generateHr(doc,orderTableTop + 20);
	doc.font("Helvetica");
	for (i = 0; i < this.order.items.length; i++) {
		const item = this.order.items[i];
		const position = orderTableTop + (i + 1) * 30;
		this.generateTableRow(doc,position,item.description, this.order.vertoning.zaal, this.order.vertoning.datum , this.order.vertoning.uur,`${(item.amount_total / item.quantity).toString().slice(0,1)}€`,item.quantity,`${item.amount_total.toString().length > 3 ? item.amount_total.toString().slice(0,2) :  item.amount_total.toString().slice(0,1)}€ `);
		this.generateHr(doc, position + 20);
	}
 }

  generateTableRow(doc, y, c1, c2, c3, c4, c5, c6, c7) {
	doc.fontSize(10)
		.text(c1, 50, y)
		.text(c2, 180, y, {width: 40, align: 'right' })
		.text(c3, 240, y, {width: 60, align: 'right' })
		.text(c4, 310, y, {width: 40, align: 'right' })
		.text(c5, 330, y, { width: 90, align: 'right' })
		.text(c6, 420, y, { width: 90, align: 'right' })
		.text(c7, 0, y, { align: 'right' });
 }

  generateFooter(doc) {
	doc.fontSize(10,)
       .text('* Tickets zijn enkel geldig op de datum en het uur van de vertoning. Bedankt om tickets te kopen bij cinema focus', 50, 700);
  }

  generateHr(doc, y) {
	doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(580, y).stroke();
  }

  formatDate(date) {
	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
  
	return year + "/" + month + "/" + day;
  }
}


module.exports = Order;