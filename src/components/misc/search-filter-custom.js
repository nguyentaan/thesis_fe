import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../ui/custom-date-range-picker";

export const SearchFilterCustom = ({
  search,
  setSearch,
  children,
  enableSearch = true,
  searchPlaceholder = "Search",
}) => {
  const form = useForm({ values: search });
  const onSubmit = form.handleSubmit((values) => {
    setSearch(values);
  });

  return (
    <div>
      <div className="flex items-center justify-end">
        <Form {...form}>
          <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="created_at"
              render={({ field: { onChange, ref, ...rest } }) => (
                <FormItem>
                  <FormControl>
                    <DatePickerWithRange
                      onChange={(value) => {
                        let newValues = {
                          from: value?.from
                            ? new Date(value.from).setHours(0, 0, 0, 0)
                            : undefined,
                          to: value?.to
                            ? new Date(value.to).setHours(23, 59, 59, 999)
                            : undefined,
                        };
                        onChange(newValues);
                      }}
                      disableFuture
                      placeholder="Filter by created date"
                      {...rest}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {enableSearch && (
              <FormField
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={searchPlaceholder}
                        {...field}
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {children}
            <Button variant={"default"} type="submit">
              Apply
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
