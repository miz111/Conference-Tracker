function AttendeesList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className="col-sm-9">Name</th>
                    <th>Conference</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.attendees.map(attendee => {
                    return (
                        <tr key={attendee.href}>
                            <td>{attendee.name}</td>
                            <td>{attendee.conference}</td>
                            <td></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default AttendeesList;
