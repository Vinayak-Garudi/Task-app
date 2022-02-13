import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
import emailjs from 'emailjs-com';
import React from 'react';
import { FormItem, Form } from 'react-native-form-component';


console.reportErrorsAsExceptions = false;


export default function App() {

  function handleSubmit(e) {
    e.preventDefault();
    emailjs.sendForm(
      'service_gwpoe9n',
      'template_i8gp5r6',
      e.target,
      'user_tAlxujgCc0QaMY7fTc0HW'
    ).then(res=>{
      console.log(res)
    }).catct(err=>{
      console.log(err)
    });
    alert('Form has succesfully been submitted');
  }
  return (
    <View style={styles.container}>
      <br/> <br/> <br/>
      <Text>Contact Form</Text>

      <Form onButtonPress={handleSubmit}>
        <View>
          <TextInput
            style={{ borderWidth: 2, borderColor: 'black', margin: 10 }}
            name="name"
            placeholder='Enter Name...' />
        </View>

        <View>
          <TextInput
            style={{ borderWidth: 2, borderColor: 'black', margin: 10 }}
            name="number"
            placeholder='Enter Contact Number...' />
        </View>

        <View>
          <TextInput
            style={{ borderWidth: 2, borderColor: 'black', margin: 10 }}
            name="email"
            placeholder='Enter Email Id...' />
        </View>

        <View>
          <TextInput
            style={{ borderWidth: 2, borderColor: 'black', margin: 10 }}
            name="message"
            placeholder='Enter Message...' />
        </View>

        {/* <Button title='Submit' /> */}
      </Form>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
