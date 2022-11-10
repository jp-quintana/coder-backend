import { useState, useEffect, useRef } from 'react';

import io from 'socket.io-client';
import { denormalize, schema } from 'normalizr';

import './App.css';

const socket = io.connect('http://localhost:8080/');

function App() {
  const [products, setProducts] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailInput = useRef();
  const nameInput = useRef();
  const lastNameInput = useRef();
  const ageInput = useRef();
  const userNameInput = useRef();
  const avatarInput = useRef();
  const messageInput = useRef();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/api/productos-test');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    socket.emit('user_connect');
  }, []);

  useEffect(() => {
    if (!messages) {
      socket.on('load_messages', async (payload) => {
        const authorEntity = new schema.Entity('authors');

        const textEntity = new schema.Entity('text', {
          author: authorEntity,
        });

        const messageEntity = new schema.Entity('messages', {
          posts: [textEntity],
        });

        const deNormalize = await denormalize(
          payload.result,
          messageEntity,
          payload.entities
        );

        const { posts } = deNormalize;

        setMessages(posts);
      });
    }
  }, []);

  useEffect(() => {
    console.log('runnin');
    socket.on('receive_message', async (payload) => {
      const authorEntity = new schema.Entity('authors');

      const textEntity = new schema.Entity('text', {
        author: authorEntity,
      });

      const messageEntity = new schema.Entity('messages', {
        posts: [textEntity],
      });

      const deNormalize = await denormalize(
        payload.result,
        messageEntity,
        payload.entities
      );

      const { posts } = deNormalize;

      setMessages(posts);
    });
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const payload = {
      author: {
        id: emailInput.current.value,
        name: nameInput.current.value,
        lastName: lastNameInput.current.value,
        age: ageInput.current.value,
        userName: userNameInput.current.value,
        avatar: avatarInput.current.value,
      },
      text: messageInput.current.value,
    };
    await socket.emit('send_message', payload);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header></header>
      <main>
        <h1>Inicio</h1>
        <section>
          <h2>Productos</h2>
          <div>
            {!products && <p>Cargando...</p>}
            {products && (
              <table className="products">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.name}>
                      <th>{product.name}</th>
                      <th>{product.price}</th>
                      <th>
                        <img src={product.image} alt="" />
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
        <section>
          <h2>Chat</h2>
          <form action=""></form>
          <div className="chat-container">
            <div className="chat-header"></div>
            <div className="chat-main">
              <div id="chatMessages">
                {messages &&
                  messages.map((message) => (
                    <div key={message.id}>
                      {message.author.userName}: {message.text}
                    </div>
                  ))}
              </div>
            </div>
            <div className="chat-form-container">
              <form onSubmit={handleSubmit} className="chat-form">
                <label>
                  <span>Email:</span>
                  <input type="email" ref={emailInput} required />
                </label>
                <label>
                  <span>Nombre:</span>
                  <input type="text" ref={nameInput} required />
                </label>
                <label>
                  <span>Apellido:</span>
                  <input type="text" ref={lastNameInput} required />
                </label>
                <label>
                  <span>Edad:</span>
                  <input type="text" ref={ageInput} required />
                </label>
                <label>
                  <span>Alias:</span>
                  <input type="text" ref={userNameInput} required />
                </label>
                <label>
                  <span>Avatar:</span>
                  <input type="url" ref={avatarInput} required />
                </label>
                <textarea
                  id="messageInput"
                  type="text"
                  placeholder="Ingresar mensaje"
                  ref={messageInput}
                  autoComplete="off"
                  required
                />
                {!isLoading && <button className="btn">Enviar</button>}
                {isLoading && (
                  <button className="btn" disabled>
                    Cargando...
                  </button>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
