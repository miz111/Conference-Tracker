import React from 'react';

class PresentationForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            presenterName: '',
            presenterEmail: '',
            companyName: '',
            title: '',
            synopsis: '',
            conferences: []
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ conferences: data.conferences });


        }

        this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.presenter_name = data.presenterName;
        data.company_name = data.companyName;
        data.presenter_email = data.presenterEmail;
        delete data.presenterName;
        delete data.companyName;
        delete data.presenterEmail;
        delete data.conferences;

        const selectTag = document.getElementById('conference');
        const optionValue = selectTag.options[selectTag.selectedIndex].value;
        console.log(optionValue)
        const presentationUrl = `http://localhost:8000${optionValue}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);

        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);

            const cleared = {
                presenterName: '',
                presenterEmail: '',
                companyName: '',
                state: '',
                title: '',
                synopsis: '',
                conference: '',
            };
            this.setState(cleared);
        }
    }

    handlePresenterNameChange(event) {
        const value = event.target.value;
        this.setState({ presenterName: value })
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({ presenterEmail: value })
    }

    handleCompanyNameChange(event) {
        const value = event.target.value;
        this.setState({ companyName: value })
    }

    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({ title: value })
    }

    handleSynopsisChange(event) {
        const value = event.target.value;
        this.setState({ synopsis: value })
    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({ conference: value })
    }



    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={this.handleSubmit} id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.presenterName} onChange={this.handlePresenterNameChange} placeholder="Name" required type="text" name="presenter_name" id="presenter_name"
                                    className="form-control" />
                                <label htmlFor="name">Presenter name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input value={this.state.presenterEmail} onChange={this.handleEmailChange} type="email" placeholder="Email" required name="presenter_email"
                                    id="presenter_email" className="form-control" />
                                <label htmlFor="email">Presenter email</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input value={this.state.companyName} onChange={this.handleCompanyNameChange} placeholder="Company name" type="text" name="company_name" id="company_name"
                                    className="form-control" />
                                <label htmlFor="company_name">Company name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title"
                                    className="form-control" />
                                <label htmlFor="name">Title</label>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Synopsis" className="form-label">Synopsis</label>
                                <textarea value={this.state.synopsis} onChange={this.handleSynopsisChange} className="form-control" name="synopsis" id="synopsis" rows="3"></textarea>
                            </div>

                            <div className="mb-3">
                                <select value={this.state.conference} onChange={this.handleConferenceChange} name="conference" required id="conference" className="form-select">
                                    <option value="">Choose a conference</option>
                                    {this.state.conferences.map(conference => {
                                        return (
                                            <option key={conference.href} value={conference.href}>
                                                {conference.name}</option>
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
    };
}

export default PresentationForm;
