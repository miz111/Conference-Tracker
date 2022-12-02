import React from 'react';
import Nav from './Nav';
import LocationForm from './LocationForm';
import AttendeesList from './AttendeesList';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="locations/new" element={<LocationForm />} />
        </Route> */}
        <Route path="locations">
          <Route path="new" element={<LocationForm />} />
        </Route>
        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} />
        </Route>
        <Route path="attendees">
          <Route path="" element={<AttendeesList attendees={props.attendees} />} />
          <Route path="new" element={<AttendeeForm />} />
        </Route>
        <Route path="presentations">
          <Route path="new" element={<PresentationForm />} />
        </Route>
        <Route path="/">
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// function App(props) {
//   if (props.attendees === undefined) {
//     return null
//   }
//   return (
//     <>
//       <Nav />
//       <div className="container">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th className="col-sm-9">Name</th>
//               <th>Conference</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {props.attendees.map(attendee => {
//               return (
//                 <tr key={attendee.href}>
//                   <td>{attendee.name}</td>
//                   <td>{attendee.conference}</td>
//                   <td></td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//       </div>
//     </>
//   );
// }

// function App(props) {
//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Conference</th>
//           </tr>
//         </thead>
//         <tbody>
//           for (let attendee of props.attendees) {
//             <tr>
//               <td>{attendee.name}</td>
//               <td>{attendee.conference}</td>
//             </tr>
//           }
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;

// function App(props) {
  // if (props.attendees === undefined) {
  //   return null;
//   }
//   return (
//     <div>
//       Number of attendees: {props.attendees.length}
//     </div>
//   );
// }

// export default App;

// function App(props) {
//   return (
//     <div>
//       Number of attendees: {props.attendees.length}
//     </div>
//   );
// }

// export default App;





// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
