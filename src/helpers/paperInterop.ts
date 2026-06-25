import { cssInterop } from "nativewind";
import {
    Surface,
    IconButton,
    Avatar,
    Button,
    TextInput,
    Card,
    Divider,
    Text,
    Checkbox,
    RadioButton,
    ProgressBar,
    Badge,
    List,
    Drawer,
    Searchbar,
    DataTable,
    Menu,
} from "react-native-paper";

const registerInterop = (component: any) => {
    cssInterop(component, { className: "style" });
};

registerInterop(Text);
registerInterop(Button);
registerInterop(RadioButton);
registerInterop(RadioButton.Group);
registerInterop(RadioButton.Item);
registerInterop(RadioButton.Android);
registerInterop(RadioButton.IOS);
registerInterop(TextInput);
registerInterop(Searchbar);
registerInterop(Card);
registerInterop(Card.Content);
registerInterop(Card.Actions);
registerInterop(Card.Cover);
registerInterop(Card.Title);
registerInterop(Surface);
registerInterop(IconButton);
registerInterop(Avatar.Icon);
registerInterop(Avatar.Image);
registerInterop(Avatar.Text);
registerInterop(Divider);
registerInterop(Checkbox);
registerInterop(Checkbox.Item);
registerInterop(Checkbox.Android);
registerInterop(Checkbox.IOS);
registerInterop(ProgressBar);
registerInterop(Badge);
registerInterop(List.Accordion);
registerInterop(List.AccordionGroup);
registerInterop(List.Icon);
registerInterop(List.Item);
registerInterop(List.Section);
registerInterop(List.Subheader);
registerInterop(Drawer.Item);
registerInterop(Drawer.Section);
registerInterop(DataTable);
registerInterop(DataTable.Header);
registerInterop(DataTable.Title);
registerInterop(DataTable.Row);
registerInterop(DataTable.Cell);
registerInterop(DataTable.Pagination);
registerInterop(Menu);
registerInterop(Menu.Item);
