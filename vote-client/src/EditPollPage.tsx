// src/pages/EditPollPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from './api';   

export default function EditPollPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  api.get(`/polls/${id}`).then((res) => {
    setTitle(res.data.title || '');

    // Витягуємо лише унікальні варіанти відповіді з голосів
    const uniqueOptions = Array.from(
      new Set(res.data.votes.map((v: any) => v.option))
    );

    setOptions(uniqueOptions);
    setLoading(false);
  });
}, [id]);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) =>
    setOptions(options.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (title.trim() === '' || options.filter((o) => o.trim()).length < 2) return;

  api.patch(`/polls/${id}`, {
    title,
    options: options.filter((o) => o.trim() !== ''), // Передаємо всі варіанти
  }).then(() => navigate(`/polls/${id}`));
};
  if (loading) return <p>Loading...</p>;

  return (
   <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
  <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Редагувати голосування</h2>

  <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Заголовок:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />
    </div>

    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Опції:</label>
      {options.map((option, index) => (
        <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="button"
            onClick={() => removeOption(index)}
            style={{
              background: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '0 0.75rem',
              cursor: 'pointer'
            }}
          >
            🗑
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addOption}
        style={{
          background: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        + Додати опцію
      </button>
    </div>

    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button
        type="submit"
        style={{
          background: '#4a90e2',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Зберегти
      </button>
    </div>
  </form>

  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
    <button
      onClick={() => navigate(-1)}
      style={{
        background: '#ccc',
        color: '#333',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      ← Назад
    </button>
  </div>
</div>
  );
}
