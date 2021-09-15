import Airtable from 'airtable';
import { useSelector, useDispatch } from 'react-redux';
import React, { FunctionComponent, Fragment, useEffect } from 'react';

import {
  selectData,
  selectError,
  selectLoading,
  selectLoggedIn,
  selectUser,
  setData,
  setLoading,
  setLoggedIn,
  setUser,
  setError
} from './appSlice';

import Form from "../form/Form";
import Classes from "../classes/Classes";

import { AppProps, AppState } from 'types';

const base = new Airtable({ apiKey: process.env.APIKEY }).base('app8ZbcPx7dkpOnP0');

const App: FunctionComponent<AppProps> = () => {
  const loading = useSelector(selectLoading);
  const loggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== '') getResults();
  }, [user]);

  function getLinkedRecord(table: string, id: string) {
    return base(table).find(id);
  }

  async function getResults() {
    dispatch(setLoading(true));
    dispatch(setError(''));

    base('Students').select({
      maxRecords: 1,
      view: 'Grid view',
      filterByFormula: `({Name}="${user}")`
    }).firstPage(async (err, records) => {
      if (err && (records === undefined || records === null)) {
        console.error(err);
        dispatch(setError('Could not fetch results !!!'));
      }

      if (records !== undefined && records !== null) {
        if (records.length < 1) {
          dispatch(setError(`Student "${user}" does not exist !!!`));
          dispatch(setUser(""));
        } else {
          const data = await ((records[0]?.get('Classes') as string[] ?? [])).reduce(async (acc, item) => {
              const record = await getLinkedRecord('Classes', item);
              const Students = await Promise.all(((record?.get('Students') as string[]) ?? []).map(async (item) => (await getLinkedRecord('Students', item)).get('Name')));
              
              return Object.assign(await acc, {
                [item]: {
                  Name: record.get('Name'),
                  Students: Students.length > 1 ? Students : ["No Linked Students"]
                }
              });
          }, {} as Promise<AppState['data']>);
    
          dispatch(setData(data));
          dispatch(setLoggedIn(true));
        }
      }
      
      dispatch(setLoading(false));
    });
  }

  function logout() {
    dispatch(setUser(''));
    dispatch(setData({}));
    dispatch(setLoggedIn(false));
  }

  return (
    <Fragment>
      {loading === true ? (
        <span className="loading">Loading...</span>
      ) : loggedIn === false ? (
        <Form
          onSubmit={(user: string) => dispatch(setUser(user))}
          error={error}
        />
      ) : (
        <Classes
          data={data}
          handleLogout={logout}
        />
      )}
    </Fragment>
  );
};

export default App;