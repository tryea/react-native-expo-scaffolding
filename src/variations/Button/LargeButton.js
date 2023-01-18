// variations/Button/LargeButton.js
import { Button } from '../../atoms/Button';

const LargeButton = ({ title, onPress, color }) => (
  <Button
    title={title}
    onPress={onPress}
    style={[styles.button, { padding: 20 }]}
    color={color}
  />
);

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
  },
});

export default LargeButton;
