import Cards from '../../../Components/User/Cards';
import Slider from '../../../Components/User/Slider';

const Dashboard = () => {
  document.title = 'Trang chủ';
  return (
    <div>
      <div>
        <Slider />
      </div>
      <div>
        <Cards />
      </div>
    </div>
  );
};

export default Dashboard;
