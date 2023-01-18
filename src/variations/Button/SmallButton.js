// variations/Button/SmallButton.js
import { Button } from '../../atoms/Button';

const SmallButton = ({ title, onPress, color }) => (
  <Button
    title={title}
    onPress={onPress}
    style={[styles.button, { padding: 10 }]}
    color={color}
  />
);

const styles = StyleSheet.create({
  button: {
    fontSize: 12,
  },
});

export default SmallButton;
