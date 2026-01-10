
const ClientDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Client Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold">My Account</h2>
          <p className="text-muted-foreground">User details...</p>
        </div>
        {/* Add more widgets here */}
      </div>
    </div>
  );
};

export default ClientDashboard;
