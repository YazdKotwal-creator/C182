import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from 'expo-permissions';
import Filter1 from './Filter1';
import Filter2 from './Filter2';
import * as FaceDetector from 'expo-face-detector';
export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: []
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFacesDetected = this.onFacesDetected.bind(this)
        this.onFacesDetectionError = this.onFacesDetectionError.bind(this)
    }

    componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)
    }
    onCameraPermission = (status) => {
        this.setState({ hasCameraPermission: status.status === 'granted' })
    }

    onFacesDetected = (faces) => {
        this.setState({ faces: faces })
    }
    onFacesDetectionError = (e) => {
        console.log(error)
    }
    render() {
        const { hasCameraPermission } = this.state
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        console.log(this.state.faces)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>FR APP</Text>
                </View>
                <View style={styles.CameraStyle}>
                    <Camera style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.Fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetected}/>
                    {
                        this.state.faces.map(face => {
                            return <Filter1 key={face.faceID} face={face} />
                        })
                    }
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    droidSafeArea: {
        marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: "center"
    },
    titleText: {
        fontSize: 30
    },
    CameraStyle: {
        flex: 0.6
    },
    filterContainer: {

    },
    actionContainer: {

    }
})