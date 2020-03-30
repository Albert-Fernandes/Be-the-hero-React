import React from 'react'
import {Feather} from '@expo/vector-icons'
import {View, Text, Image, TouchableOpacity,Linking} from 'react-native'
import Logo from '../../img/logo.png';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';



export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident
    const message = `Olá ${incident.name} estou entrado em contato pois gostaria de ajudar no caso 
    ${incident.title} com o valor de 
    ${Intl.NumberFormat('pt-BR',{style: 'currency', currency:'BRL'}).format(incident.value)}`;
    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients:[incident.email],
            body:message,
        })
    }
    function sendWhatssap(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}> 
                <Image source={Logo} />
                <TouchableOpacity  onPress={navigateBack}> 
                    <Feather name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}> 
                <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG</Text> 
                    <Text style={styles.incidentValue}>{incident.name}} de {incident.city}/{incident.uf}</Text> 

                    <Text style={styles.incidentProperty}>CASO:</Text> 
                    <Text style={styles.incidentValue}>{incident.title}</Text> 

                    <Text style={styles.incidentProperty}>VALOR:</Text> 
                    <Text style={styles.incidentValue}>{incident.value}</Text> 
                </View>
            </View>

            <View style={styles.contatBox}>
                <Text style={styles.heroTitle}>Salve o dia !</Text> 
                <Text style={styles.heroTitle}>Seja um Héroi</Text> 
                <Text style={styles.heroDescription}>Entre em contato:</Text> 
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatssap}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}