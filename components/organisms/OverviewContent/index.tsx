import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMemberOverview } from '../../../services/player';
import Category from './Category';
import TableRow from './TableRow';

export default function OverviewContent() {
  const [count, setCount] = useState([{
    _id: '',
    value: 0,
    name: '',
  }]);
  const [data, setData] = useState([]);

  useEffect(async () => {
    const response = await getMemberOverview();
    if (response.error) {
      toast.error(response.message, {
        position: 'top-center',
        theme: 'dark',
      });
    } else {
      setCount(response.data.count);
      setData(response.data.data);
      console.log(response.data);
    }
  }, []);
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
          <div className="main-content">
            <div className="row">

              {count.map((item) => {
                if (item.name !== 'Desktop' && item.name !== 'Mobile') {
                  return (
                    <div
                      key={item._id}
                      className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4"
                    >
                      <Category
                        nominal={item.value}
                        icon="Desktop"
                      >
                        Game
                        {' '}
                        <br />
                        {' '}
                        {item.name}
                      </Category>
                    </div>
                  );
                }
                return (
                  <div
                    key={item._id}
                    className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4"
                  >
                    <Category
                      nominal={item.value}
                      icon={item.name}
                    >
                      Game
                      {' '}
                      <br />
                      {' '}
                      {item.name}
                    </Category>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">Game</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <TableRow title="The Royal Game" category="Desktop" item={200} price={290000} status="Pending" image="overview-1" />
                <TableRow title="Call of Duty:Modern" category="Mobile" item={550} price={740000} status="Success" image="overview-2" />
                <TableRow title="Clash of Clans" category="Mobile" item={100} price={130000} status="Failed" image="overview-3" />
                <TableRow title="Mobile Legends: The New Battle 2021" category="Mobile" item={225} price={220000} status="Pending" image="overview-4" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
