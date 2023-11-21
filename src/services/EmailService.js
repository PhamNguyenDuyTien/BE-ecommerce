const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64')
const bcrypt = require("bcrypt")
const UserVerification = require('../models/UserVerification')

const { v4: uuidv4 } = require('uuid')
const UserResetPassword = require('../models/UserResetPassword')
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_ACCOUNT, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
})
const sendEmailSignUpAuth = (_id, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let currentUrl = `http://localhost:3001/`
      let uniqueString = uuidv4() + _id
      let mailOptions = {
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Xác thực tài khoản Email của bạn", // Subject line
        html: `<div>
    <b>Xác thực địa chỉ Email của bạn:</b>
    <p>Đường link này sẽ hết hạn trong 6 h</p>
    </div> 
    <a href=${currentUrl + 'api/user/verifySignUp/' + _id + '/' + uniqueString}>Nhấn vào đây</a>`,
      }
      const saltRounds = 10
      bcrypt.hash(uniqueString, saltRounds)
      .then((hashedUniqueString)=>{
        const newVerification = new UserVerification({
          userId: _id,
          uniqueString: hashedUniqueString,
          createdAt: Date.now(),
          expiresAt: Date.now() + 21600000,
        })
        newVerification.save()
        .then(()=>{
          transporter.sendMail(mailOptions)
       
          .then(()=>{
               resolve({
                code: 200,
                success: true,
                message: 'Gửi Email Xác Nhận Đăng Ký Thành Công!'
           
        })
          })
          .catch((error)=>{
            console.log('Đã xảy ra lỗi khi gửi Email!',error)
            resolve({
              code: 500,
              success: false,
              message: 'Đã xảy ra lỗi khi gửi Email!'
             
          })
          })
        })
        .catch((error)=>{
          console.log('Đã xảy ra lỗi khi lưu data vào bảng UserVerification',error)
          resolve({
            code: 500,
            success: false,
            message: 'Đã xảy ra lỗi khi lưu data vào bảng UserVerification'
           
        })
        })

      })
      .catch((error)=>{
        console.log('Đã xảy ra lỗi khi băm dữ liệu uniqueString!', error)
        resolve({
          code: 500,
            success: false,
          message: 'Đã xảy ra lỗi khi băm dữ liệu uniqueString!'
         
      })
      })

    } catch (error) {
      reject(error)
    }
  })


}
const sendEmailResetPassword = (_id,email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let currentUrl = `http://localhost:3001/`
      let resetString = uuidv4() + _id
      let mailOptions = {
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Yêu cầu thay đổi mật khẩu", // Subject line
        html: `<div>
    <b>Chào quý khách:</b>
    <b>OBERI đã nhận được yêu cầu thay đổi mật khẩu của quý khách.
    Xin hãy bấm vào tại đây để đổi mật khẩu:</b>
    <p>Lưu ý: đường dẫn chỉ có hiệu lực trong vòng 30 phút.</p>
    <p>Mọi thắc mắc và góp ý vui lòng liên hệ với Tiki Care:
    - Email: ${process.env.MAIL_ACCOUNT}
    - Số điện thoại: 0398870512 (1000đ/phút , 8-21h kể cả T7, CN).
    Trân trọng</p>
    </div> 
    <a href=${'http://localhost:3000/verifyResetPassword/' + _id + "/" + resetString}>Nhấn vào đây</a>`,
      }
      const saltRounds = 10
      bcrypt.hash(resetString, saltRounds)
      .then((hashedResetString)=>{
        const newResetPassword = new UserResetPassword({
          userId: _id,
          resetString: hashedResetString,
          createdAt: Date.now(),
          expiresAt: Date.now() + 1800000,
        })
        newResetPassword.save()
        .then(()=>{
          transporter.sendMail(mailOptions)
       
          .then(()=>{
               resolve({
                code: 200,
                success: true,
            message: 'Gửi Email reset password Thành Công!'
           
        })
          })
          .catch((error)=>{
            console.log('Đã xảy ra lỗi khi gửi reset password Email!',error)
            resolve({
              code: 500,
            success: false,
              message: 'Đã xảy ra lỗi khi gửi reset password Email!'
             
          })
          })
        })
        .catch((error)=>{
          console.log('Đã xảy ra lỗi khi lưu data vào bảng UserResetPassword',error)
          resolve({
            code: 500,
            success: false,
            message: 'Đã xảy ra lỗi khi lưu data vào bảng UserResetPassword'
           
        })
        })

      })
      .catch((error)=>{
        console.log('Đã xảy ra lỗi khi băm dữ liệu resetString!', error)
        resolve({
          code: 500,
            success: false,
          message: 'Đã xảy ra lỗi khi băm dữ liệu resetString!'
         
      })
      })

    } catch (error) {
      reject(error)
    }
  })


}


// const sendEmailCreateOrder = async (email,orderItems) => {

//   transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'})) 

//   let listItem = '' 
//   const attachImage = []
//   orderItems.forEach((order) => {
//     listItem += `<div>
//     <div>
//       Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
//       <div>Bên dưới là hình ảnh của sản phẩm</div>
//     </div>`
//     attachImage.push({path: order.image})
//   })

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: process.env.MAIL_ACCOUNT, // sender address
//     to: email, // list of receivers
//     subject: "Bạn đã đặt hàng tại shop LẬP trình thật dễ", // Subject line
//     text: "Hello world?", // plain text body
//     html: `<div><b>Bạn đã đặt hàng thành công tại shop Lập trình thật dễ</b></div> ${listItem}`,
//     attachments: attachImage,
//   }) 
// }

module.exports = {
  // sendEmailCreateOrder,
  sendEmailSignUpAuth,
  sendEmailResetPassword
}