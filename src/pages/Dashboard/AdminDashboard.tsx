
const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-muted-foreground">System stats...</p>
        </div>
        {/* Add more widgets here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
