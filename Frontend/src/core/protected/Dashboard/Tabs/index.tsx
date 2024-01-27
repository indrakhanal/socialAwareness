import React, {useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the default styles
import './tabs.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/root-reducer";
import { getHomePagesAction } from '../../../../store/modules/partials/gethomePageData';
import TabContent from './tabContent';

const MultiTabMenu: React.FC = () => {
  const dispatch = useDispatch()
  const userProfile = useSelector(
    (state: RootState) => state.getHomePagesActionReducer.data
  );
  useEffect(() => {
      dispatch<any>(getHomePagesAction());
    
  }, [dispatch]);
  return (
    <div className='row'>
      <Tabs>
        <TabList>
          <Tab>Cause</Tab>
          <Tab>Business</Tab>
          <Tab>Participation</Tab>
          <Tab>Others</Tab>
        </TabList>

        <TabPanel>
          <h2>Latest List Of Cause</h2>
          <small>you can choose any cause if you like to ingage to the idea.</small>
          <hr />
          <TabContent data={userProfile} options='cause' />
          {/* Add your content for Tab 1 here */}
        </TabPanel>
        <TabPanel>
          <h2>Latest List of Business Ideas</h2>
          <small>Pick one if you want to grow your business!!</small>
          <hr />
          <TabContent data={userProfile} options='business'/>
          {/* Add your content for Tab 2 here */}
        </TabPanel>
        <TabPanel>
          <h2>Latest List of Participations</h2>
          <small>Latest List of Participations!</small>
          <hr />
          
        </TabPanel>
        <TabPanel>
          <h2>Latest List of Other any things</h2>
          <small>Latest List of Other any things</small>
          <hr />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MultiTabMenu;
