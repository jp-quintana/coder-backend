const { UserDAO } = require('../daos/user');

const { transporter } = require('../utils/mailer');

exports.createUser = async ({
  username,
  password,
  name,
  address,
  phone,
  age,
}) => {
  await UserDAO.create({
    username,
    password,
    name,
    address,
    phone,
    age,
  });

  const contentHTML = `
        <h1>Informacion del usuario</h1>
        <ul>
          <li>
            Nombre de usuario: ${username}
          </li>
          <li>
            Nombre: ${name}
          </li>
          <li>
            Edad: ${age}
          </li>
          <li>
            Direccion: ${address}
          </li>
          <li>
            Telefono: ${phone}
          </li>
        </ul>
      `;

  await transporter.sendMail({
    from: '"CODER API" <process.env.EMAIL_ADMIN>', // sender address
    to: process.env.EMAIL_ADMIN, // list of receivers
    subject: 'Registro Nuevo Usuario', // Subject line
    html: contentHTML, // html body
  });
};

exports.fetchUser = async ({ email }) => {
  return await UserDAO.collection.findOne({ username: email });
};
