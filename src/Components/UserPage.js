import React, { Component } from 'react';
import fire from './firebaseInfo';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Timer from './Timer.js';
import TaskBar from './TaskBar';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            cycles: 0,
            uid: "",
            allPersons: []
        }
    }

    logout = () => {
        fire.auth().signOut();
    }

    componentDidMount() {
        firebase.database().ref("users").on('value', (snapshot) => {
            let persons = [];
            for (let person in snapshot.val()) {
                persons.push({
                    username: snapshot.val()[person].username,
                    cycles: snapshot.val()[person].cycles,
                    databaseid: person,
                    uid: snapshot.val()[person].uid
                });
            }
            this.setState({
                allPersons: persons
            })
        });
    }

    updateCount = () => {
        console.log("calling updateCoutn in userpage")
        let alreadyIncluded = false;
        let id = "";
        let tempCycles = 0;
        for (let person in this.state.allPersons) {
            if (this.state.allPersons[person].uid === fire.auth().currentUser.uid) {
                alreadyIncluded = true
                id = this.state.allPersons[person].databaseid
                tempCycles = this.state.allPersons[person].cycles
            }
        }
        if (alreadyIncluded) {
            firebase.database().ref(`/users/${id}`).update({ cycles: tempCycles + 1 });
        }
        else {
            let newPerson = {
                username: fire.auth().currentUser.email.slice(0, fire.auth().currentUser.email.indexOf('@')),
                cycles: 1,
                uid: fire.auth().currentUser.uid
            }
            firebase.database().ref("users").push(newPerson);
        }
    }

    render() {
        return (
            <div>
                <TaskBar updateCount={this.updateCount} />
            </div>
        );
    }
}

export default UserPage