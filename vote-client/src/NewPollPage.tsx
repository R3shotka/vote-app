import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './api';
import { Link } from 'react-router-dom';

function NewPollPage() {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const navigate = useNavigate();

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '' || options.filter((o) => o.trim() !== '').length < 2) {
      alert('Будь ласка, введіть заголовок і мінімум дві опції.');
      return;
    }

    try {
      const response = await api.post('/polls', {
        title,
        options: options.filter((o) => o.trim() !== ''), // Виправлено: передаємо масив рядків
      });
      navigate(`/polls/${response.data.id}`);
    } catch (error) {
      console.error('Помилка при створенні голосування:', error);
      alert('Сталася помилка під час створення голосування.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          На головну сторінку
        </button>
      </div>

      <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Створити нове голосування</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label>
            Заголовок:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                display: 'block',
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Опції:</h3>
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                style={{
                  flex: 1,
                  marginRight: '0.5rem',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  style={{
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.4rem 0.6rem',
                    cursor: 'pointer',
                  }}
                >
                  Видалити
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            style={{
              background: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            Додати опцію
          </button>
        </div>

        <button
          type="submit"
          style={{
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'block',
            margin: '0 auto'
          }}
        >
          Створити голосування
        </button>
      </form>
    </div>
  );
}

export default NewPollPage;
