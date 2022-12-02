import React from 'react';


class ConferenceForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentation: '',
            maxAttendees: '',
            location: '',
            locations: []

        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationChange = this.handleMaxPresentationChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.max_presentations = data.maxPresentation;
        data.max_attendees = data.maxAttendees;
        delete data.maxPresentation;
        delete data.maxAttendees;
        delete data.locations;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            const cleared = {
                name: '',
                starts: '',
                ends: '',
                description: '',
                maxPresentation: '',
                maxAttendees: '',
                location: '',
            };
            this.setState(cleared);
        }
    }


    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleStartChange(event) {
        const value = event.target.value;
        this.setState({ starts: value })
    }

    handleEndChange(event) {
        const value = event.target.value;
        this.setState({ ends: value })
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({ description: value })
    }

    handleMaxPresentationChange(event) {
        const value = event.target.value;
        this.setState({ maxPresentation: value })
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({ maxAttendees: value })
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({ location: value })
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ locations: data.locations });

            // const selectTag = document.getElementById('location');
            // for (let location of data.locations) {
            //     const option = document.createElement("option");
            //     option.value = location.id;
            //     option.innerHTML = location.name;
            //     selectTag.appendChild(option);
            // }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name"
                                    className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input value={this.state.starts} onChange={this.handleStartChange} placeholder="Start time" required type="date" name="starts" id="starts"
                                    className="form-control" />
                                <label htmlFor="starts">Starts</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input value={this.state.ends} onChange={this.handleEndChange} placeholder="End time" required type="date" name="ends" id="ends"
                                    className="form-control" />
                                <label htmlFor="ends">Ends</label>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea value={this.state.description} onChange={this.handleDescriptionChange} className="form-control" name="description" id="description" rows="3"></textarea>
                            </div>

                            <div className="form-floating mb-3">
                                <input value={this.state.maxPresentation} onChange={this.handleMaxPresentationChange} placeholder="Max_presentations" required type="text" name="max_presentations"
                                    id="max_presentations" className="form-control" />
                                <label htmlFor="max_presentations">Maximum presentations</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input value={this.state.maxAttendees} onChange={this.handleMaxAttendeesChange} placeholder="Max_attendees" required type="text" name="max_attendees"
                                    id="max_attendees" className="form-control" />
                                <label htmlFor="max_attendees">Maximum attendees</label>
                            </div>

                            <div className="mb-3">
                                <select value={this.state.location} onChange={this.handleLocationChange} name="location" required id="location" className="form-select">
                                    <option value="">Choose a location</option>
                                    {this.state.locations.map(location => {
                                        return (
                                            <option key={location.href} value={location.id}>
                                                {location.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default ConferenceForm;
