export interface dbConfigProps {
  dbName: string;
  dbHost: string;
  dbPort: number;
}

export const config: dbConfigProps = {
  dbName: 'main',
  dbHost: 'localhost',
  dbPort: 27017
};
