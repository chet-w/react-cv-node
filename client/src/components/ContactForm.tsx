import React from "react";
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";


export interface propTypes extends FormComponentProps {

}

export interface stateTypes {
    phOptions: { name: string, email: string, message: string }[];
    selected: number;
    formDisabled: boolean;
}

var API_KEY = 'key-c8a8c3f17ef1e96a76a60e8506a4eada';
var DOMAIN = 'sandboxcf95410aeb0248c4b8bb31be96709f7a.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'chethana96@gmail.com',
    subject: 'mailgun test',
    text: 'Testing some Mailgun awesomeness!'
};

class ContactForm extends React.Component<propTypes, stateTypes> {

    constructor(props: propTypes) {
        super(props);
        this.state = {
            phOptions: [
                { name: "Frodo Baggins", email: "frodo@theshire.co.nz", message: "The ring is mine" },
                { name: "Samwise Gamgee", email: "sam@theshire.co.nz", message: "Boil 'em, mash 'em, stick 'em in a stew" },
                { name: "Legolas Greenleaf", email: "legolas@woodland.co.nz", message: "They're taking the Hobbits to Isengard" },
                { name: "Gimli, son of Gloin", email: "gimli@moria.co.nz", message: "...and my axe!" },
                { name: "Gandalf the Grey", email: "gandalf@valinor.co.nz", message: "You shall not pass!" },
            ],
            selected: Math.round(Math.random() * 4),
            formDisabled: false
        };


    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: { name: string, email: string, message: string }) => {
            if (!err) {
                this.setState({ formDisabled: true });
                message.success(`Thanks for the message, ${values.name}! I'll be in contact soon.`);
                axios.post("http://localhost:3000/")
                

            } else {
                message.error("Looks like you've still got some fields to fill out");
            }
        });
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const placeholder = this.state.phOptions[this.state.selected];

        return (
            <div className={this.state.formDisabled ? "contact-form disabled" : "contact-form"}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="Name"
                        hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter your name', whitespace: true }],
                        })(
                            <Input placeholder={placeholder.name} disabled={this.state.formDisabled} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        hasFeedback
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: "That doesn't look like a valid e-mail address",
                            }, {
                                required: true, message: 'Please enter your e-mail address',
                            }],
                        })(
                            <Input placeholder={placeholder.email} disabled={this.state.formDisabled} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Message"
                        hasFeedback
                    >
                        {getFieldDecorator('message', {
                            rules: [{ required: true, message: 'Please enter a message', whitespace: true }],
                        })(
                            <TextArea placeholder={placeholder.message} disabled={this.state.formDisabled} />
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={this.state.formDisabled} >Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedContactForm = Form.create()(ContactForm);

export default WrappedContactForm;