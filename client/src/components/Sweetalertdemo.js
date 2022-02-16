import React, { Component } from "react";
import Swal from "sweetalert2";

export default class Sweetalertdemo extends Component {

    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleClick() {
        Swal.fire({
            title: 'Success',
            type: 'success',
            text: 'Your work has been saved.',
            timerProgressBar: true,
            
        });
    }
    HandleClick1() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'User will have Admin Privileges',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        });
    }
    HandleClick12() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        });
    }
    HandleClicktop() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        });
    }
    HandleClickAutoclose() {
        let timerInterval
        Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 1000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                            b.textContent = Swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    }


    render() {
        return (
            <div>

                <div className="row" className="hdr">
                    <div className="col-sm-12 btn btn-info">
                        SweetAlert2 In React

                    </div>
                </div>
                <div style={{ "paddingTop": "10px" }}>
                    <button className="btn btn-info btn" onClick={this.HandleClick}>Success</button>
                    <button className="btn btn-success btn" onClick={this.HandleClick1}>Confirm</button>
                    <button className="btn btn-primary btn" onClick={this.HandleClick12}>Confirm Box</button>
                    <button className="btn btn-primary btn" onClick={this.HandleClicktop}>Top Side</button>
                    <button className="btn btn-primary btn" onClick={this.HandleClickAutoclose}>Auto Close</button>

                </div>
            </div>
        );
    }
}