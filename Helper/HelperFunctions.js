import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

// user id generator
export const userIdGenerator = (phone, email) => {

    const atIndex = email.indexOf('@');
    const userPart = email.substring(0, atIndex);
    const lastFiveDigits = phone.substr(phone.length - 3);
    const userId = userPart + lastFiveDigits;
    return userId;
}

//userPasswordGenerator

export const userPasswordGenerator = (phone, email) => {

    const atIndex = email.indexOf('@');
    const userPart = email.substring(0, atIndex - 4);
    const lastFiveDigits = phone.substr(phone.length - 3);
    const userPassword = lastFiveDigits + userPart;

    return userPassword;

}

// passwordhashing
export const hashPassword = async (password) => {
    try{
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password,saltRound);
        return hashedPassword;

    }catch(e){
        console.log(e);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  };

// emailSer
export const emailSer = async (email, username,password) => {

    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'eleazar.dare99@ethereal.email',
                pass: 'Xn67Q2gBmQW3jw7zws'
            }
        });
          
           // async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <muhammadalimandela01@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html:`<b>Hello world?</b>
      <p>${username} : username </P>
      <p>${password} : password</P>
      
      `, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
   
  }

  main().catch(console.error);
    }catch(e){
        console.log(e);
    }
}
