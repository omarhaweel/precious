import { Pressable, StyleSheet } from "react-native";
import GoogleSignInIcon from '../../assets/login-oauth/google-login.svg';

type Props = {
  onPress?: () => void | Promise<void>;
};

export default function GoogleSignInComponent({ onPress }: Props) {
    return (
        <Pressable style={styles.iconContainer} onPress={onPress}>
            <GoogleSignInIcon width={24} height={24} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        alignSelf: 'flex-start',
        marginTop: 12,
        marginLeft: '40%',
        padding: 8,
    }
});


