import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const ExpInput = (props: any) => {
    const dispatch = useDispatch();
    const select = fields;
    const profile = useSelector((state: any) => state.profile);

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: '',
            company: '',
            location: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            working: false,
        },
        validate: {
            title: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            location: isNotEmpty("Location is required"),
            description: isNotEmpty("Description is required")
        }
    });

    useEffect(() => {
        if (!props.add) {
            form.setValues({
                title: props.title,
                company: props.company,
                location: props.location,
                description: props.description,
                startDate: new Date(props.startDate),
                endDate: new Date(props.endDate),
                working: props.working
            });
        }
    }, [props]);

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;

        let exp = Array.isArray(profile.experience) ? [...profile.experience] : [];

        if (props.add) {
            exp.push(form.values);
            exp[exp.length - 1].startDate = exp[exp.length - 1].startDate.toISOString();
            exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
        } else {
            exp[props.idx] = form.values;
            exp[props.idx].startDate = exp[props.idx].startDate.toISOString();
            exp[props.idx].endDate = exp[props.idx].endDate.toISOString();
        }

        let updatedProfile = { ...profile, experience: exp };
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", `Experience ${props.add ? 'added' : 'updated'} successfully`);
    };

    return (
        <div className="flex flex-col mb-3 gap-3">
            <div className="text-lg font-semibold ">{props.add ? 'Add' : 'Edit'} Experience</div>
            <div className="flex gap-10 [&>*]:w-1/2 ">
                <SelectInput form={form} name="title" {...select[0]} />
                <SelectInput form={form} name="company" {...select[1]} />
            </div>
            <SelectInput form={form} name="location" {...select[2]} />
            <Textarea
                {...form.getInputProps('description')}
                label="Job Summary"
                autosize
                minRows={3}
                withAsterisk
                placeholder="Enter summary..."
            />
            <div className="flex gap-10 [&>*]:w-1/2 ">
                <MonthPickerInput
                    {...form.getInputProps('startDate')}
                    label="Start date"
                    withAsterisk
                    placeholder="Pick date"
                    maxDate={form.values.endDate || undefined}
                />
                <MonthPickerInput
                    label="End date"
                    {...form.getInputProps('endDate')}
                    withAsterisk
                    placeholder="Pick date"
                    disabled={form.values.working}
                    minDate={form.values.startDate || undefined}
                    maxDate={new Date()}
                />
            </div>
            <Checkbox
                autoContrast
                label="Currently working here"
                checked={form.values.working}
                onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)}
            />
            <div className="flex gap-5">
                <Button onClick={handleSave}color="green.8" variant="light">Save</Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
            </div>
        </div>
    );
};

export default ExpInput;