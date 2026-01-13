import { useAuthStore } from '@/stores/authStore';
import LoginPage from '@/pages/LoginPage';
import VaultPage from '@/pages/VaultPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? <VaultPage /> : <LoginPage />}
      <Toaster />
    </>
  );
}

export default App;
