import React from 'react';
class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            created: '',
            group: '',
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    // Input Change Handler
    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Submit Form
    submitForm() {
        var id = this.props.match.params.id;
        fetch('http://127.0.0.1:8000/api/users/' + id + '/', {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then((data) => console.log(data));
    }

    fetchData() {
        var id = this.props.match.params.id;
        fetch('http://127.0.0.1:8000/api/users/' + id)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    username: data.username,
                    created: data.created,
                    group: data.group,
                });
            });

    }

    componentDidMount() {
        this.fetchData();
    }
    // -----------

    // Select({ data, callback, selected }) {
    //     return (
    //         <select
    //             disabled={this.disabled}
    //             readOnly={this.readonly}
    //             onChange={({ target: { value } }) => callback(value)}
    //         >
    //             {data.map(([value, text]) => (
    //                 <option selected={selected === value} value={value}>
    //                     {text}
    //                 </option>
    //             ))}
    //         </select>
    //     );
    // }
    // ---------
    render() {
        return (
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Username</th>
                        <td>
                            <input value={this.state.username} name="username" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Created</th>
                        <td>
                            <input value={this.state.created} onChange={this.changeHandler} type="date" name="created" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Group</th>
                        <td>

                            {/* <label for="membership">Choose a membership plan:</label>
                            <select name="group" >
                                <option value="free">Free</option>
                                <option value="bronze">Bronze</option>
                                <option value="silver" selected>Silver</option>
                                <option value="Gold">Gold</option>
                            </select> */}
                            <select>
                                {this.state.group.map((this.element)(
                                    <option value={this.element}>{this.element}</option>
                                ))}
                            </select>


                            {/* <input value={this.state.group} name="group" onChange={this.changeHandler} type="text" className="form-control" /> */}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <input type="submit" onClick={this.submitForm} className="btn btn-dark" />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Update;