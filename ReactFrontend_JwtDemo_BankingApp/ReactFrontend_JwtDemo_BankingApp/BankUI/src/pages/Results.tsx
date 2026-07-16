import type { FC } from 'react';
import { useState } from 'react';
import DataService, { type User } from '../services/DataService';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  margin-bottom: 2rem;
`;

const ShowButton = styled.button`
  background-color: #1a73e8;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1557b0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const DataContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1rem;

  th {
    background-color: #0f4fa8;
    color: #ffffff;
    padding: 1rem;
    text-align: left;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  td {
    background-color: #fafafa;
    color: #111827;
    padding: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  tr:hover td {
    background-color: #eef4ff;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #d32f2f;
  font-size: 1rem;
  padding: 1rem;
  background-color: #ffebee;
  border-radius: 4px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #999;
  font-size: 1rem;
  padding: 2rem;
`;

const Results: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleShowCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await DataService.getUsers();
      setUsers(data);
      setShowResults(true);
    } catch (err) {
      setError('Failed to fetch customers. Please check if the backend server is running.');
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResultsContainer>
      <h1>Results</h1>
      
      <ButtonContainer>
        <ShowButton onClick={handleShowCustomers} disabled={loading}>
          {loading ? 'Loading...' : 'Show All Customers'}
        </ShowButton>
      </ButtonContainer>

      {showResults && (
        <DataContainer>
          {loading && <LoadingMessage>Loading customers...</LoadingMessage>}
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {!loading && !error && users.length === 0 && (
            <EmptyMessage>No customers found.</EmptyMessage>
          )}
          
          {!loading && !error && users.length > 0 && (
            <>
              <h2>Customers ({users.length})</h2>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </DataContainer>
      )}
    </ResultsContainer>
  );
};

export default Results;
