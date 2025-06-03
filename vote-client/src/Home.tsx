import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from './api';
import { Poll } from './types';

function Home() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    api.get<Poll[]>('/polls').then((res) => setPolls(res.data));
  }, []);

  return (
    <div className="polls-container">
  

  <div className="polls-container">
  <h1 className="polls-title">Список голосувань</h1>
  <table className="polls-table">
    <thead>
      <tr>
        <th>Назва</th>
        <th>Дата створення</th>
        <th>Кількість варіантів</th>
      </tr>
    </thead>
    <tbody>
      {polls.map((poll) => (
        <tr key={poll.id}>
          <td><Link to={`/polls/${poll.id}`}>{poll.title}</Link></td>
          <td>{new Date(poll.created_at).toLocaleString()}</td>
          <td>{new Set(poll.votes.map((v) => v.option)).size}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  <div className="create-button-wrapper">
  <button className="create-button" onClick={() => window.location.href = '/polls/new'}>
     Створити нове голосування
  </button>
</div>
</div>

  );
}

export default Home;
