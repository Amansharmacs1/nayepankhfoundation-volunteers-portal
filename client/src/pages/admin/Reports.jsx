import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';

const Reports = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadCSV = async () => {
    try {
      setLoading(true);
      const toastId = toast.loading('Generating report...');
      const res = await api.get('/admin/export/volunteers', { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'volunteers_report.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      toast.success('Report downloaded successfully', { id: toastId });
    } catch (error) {
      toast.error('Export failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500">Export platform data and volunteer statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Registrations Report</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col justify-between h-40">
            <p className="text-gray-600 text-sm">Download a CSV of all volunteers registered in the current month, including their status and details.</p>
            <Button onClick={handleDownloadCSV} disabled={loading} className="w-full flex justify-center items-center gap-2 mt-4">
              <Download className="h-4 w-4" /> {loading ? 'Exporting...' : 'Export CSV'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Impact Report</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col justify-between h-40">
            <p className="text-gray-600 text-sm">Download a comprehensive PDF summarizing overall volunteer impact, approvals, and metrics.</p>
            <Button variant="outline" onClick={handleDownload} className="w-full flex justify-center items-center gap-2 mt-4">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
