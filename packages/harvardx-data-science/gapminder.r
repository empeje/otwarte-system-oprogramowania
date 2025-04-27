library(dslabs)
library(ggplot2)
library(dplyr)
data("gapminder")
head(gapminder)

# child mortality
# 1. Sri Lanka vs. Turkey
# 2. Poland vs. South Korea
# 3. Malaysia vs. Russia
# 4. Pakistan vs. Vietnam
# 5. Thailand vs. South Africa


gapminder %>% filter(year == 2015 & country %in% c("Sri Lanka", "Turkey")) %>% select(country, infant_mortality)

gapminder %>% filter(year == 2015 & country %in% c("Poland", "South Korea")) %>% select(country, infant_mortality)

gapminder %>% filter(year == 2015 & country %in% c("Malaysia", "Russia")) %>% select(country, infant_mortality)

gapminder %>% filter(year == 2015 & country %in% c("Pakistan", "Vietnam")) %>% select(country, infant_mortality)

gapminder %>% filter(year == 2015 & country %in% c("Thailand", "South Africa")) %>% select(country, infant_mortality)


gapminder %>% filter(year == 2015 & country %in% c("Indonesia", "Malaysia")) %>% select(country, infant_mortality)


plot(gapminder$life_expectancy, gapminder$fertility)
ds_theme_set()

filter(gapminder, year== 1964) %>% ggplot(aes(fertility, life_expectancy, color=continent)) + geom_point()

filter(gapminder, year== 2014) %>% ggplot(aes(fertility, life_expectancy, color=continent)) + geom_point()


filter(gapminder, year %in% c(1964, 2012, 2014)) %>% ggplot(aes(fertility, life_expectancy, col=continent)) + geom_point() + facet_grid(continent~year)

filter(gapminder, year %in% c(1964, 2012, 2014)) %>% ggplot(aes(fertility, life_expectancy, col=continent)) + geom_point() + facet_grid(.~year)

filter(gapminder, year %in% c(1964, 1990, 2012, 2014)) %>% ggplot(aes(fertility, life_expectancy, col=continent)) + geom_point() + facet_wrap(.~year)


years <- c(1962, 1980, 1990, 2000, 2012)
continents <- c("Europe", "Asia")
gapminder %>% filter(year %in% years & continent %in% continents) %>% ggplot(aes(fertility, life_expectancy, col=continent)) + geom_point() + facet_wrap(~year)



gapminder %>% filter(country == "United States") %>% ggplot(aes(year, fertility)) + geom_line()
gapminder %>% filter(country == "Indonesia") %>% ggplot(aes(year, fertility)) + geom_line()


countries <- c("South Korea", "Indonesia", "Germany", "China")
gapminder %>% filter(country %in% countries) %>% ggplot(aes(year, fertility, group=country, col=country)) + geom_line()

countries <- c("South Korea", "Indonesia", "Germany", "China")
gapminder %>% filter(country %in% countries) %>% ggplot(aes(year, fertility, col=country)) + geom_line()


countries <- c("South Korea","Germany")
labels <- data.frame(country=countries, x = c(1975, 1965), y=c(60, 72))
gapminder %>% filter(country %in% countries) %>% ggplot(aes(year, life_expectancy, col=country)) + geom_line() + geom_text(data=labels, aes(x, y, label=country), size=5) + theme(legend.position="none")


# transformations

str(gapminder)

gapminder <- gapminder %>% mutate(dollars_per_day = gdp/population/365)
past_year <- 1970
gapminder %>% filter(year == past_year & !is.na(gdp)) %>% ggplot(aes(dollars_per_day)) + geom_histogram(binwidth = 1, color = "black")


gapminder %>% filter(year == past_year & !is.na(gdp)) %>% ggplot(aes(log2(dollars_per_day))) + geom_histogram(binwidth = 1, color = "black")

gapminder %>% filter(year == past_year & !is.na(gdp)) %>% ggplot(aes(dollars_per_day)) + geom_histogram(binwidth = 1, color = "black") + scale_x_continuous(trans="log2")

length(levels(gapminder$region))

p <- gapminder %>% filter(year == past_year & !is.na(gdp)) %>% ggplot(aes(region, dollars_per_day))

p + geom_boxplot() + theme(axis.text.x = element_text(angle = 90, hjust = 1))


fac <- factor(c("Asia", "Asia", "West", "West", "West"))
levels(fac)
value <- c(10, 11, 12, 6, 4)
fac <- reorder(fac, value, FUN=mean)
levels(fac)

p <- gapminder %>% filter(year == past_year & !is.na(gdp)) %>% mutate(region = reorder(region, dollars_per_day, FUN = median)) %>% ggplot(aes(region, dollars_per_day, fill = continent)) + geom_boxplot() + theme(axis.text.x = element_text(angle = 90, hjust = 1)) + xlab("")
p + scale_y_continuous(trans = "log2") + geom_point()
p
west <- c("Western Europe", "Northern Europe", "Southern Europe", "Northern America", "Australia and New Zealand")

gapminder %>% filter(year == past_year & !is.na(gdp)) %>% mutate(group = ifelse(region %in% west, "West", "Developing")) %>% ggplot(aes(dollars_per_day)) + geom_histogram(binwidth = 1, color = "black") + scale_x_continuous(trans = "log2") + facet_grid(. ~ group)

past_year <- 1970
present_year <- 2010
gapminder %>% filter(year %in% c(past_year, present_year) & !is.na(gdp)) %>% mutate(group = ifelse(region %in% west, "West", "Developing")) %>% ggplot(aes(dollars_per_day)) + geom_histogram(binwidth = 1, color = "black") + scale_x_continuous(trans = "log2") + facet_grid(year ~ group)

# use country that has data both in 1970 and 2010
country_list_1 <- gapminder %>% filter(year == past_year & !is.na(dollars_per_day)) %>% .$country
country_list_2 <- gapminder %>% filter(year == present_year & !is.na(dollars_per_day)) %>% .$country
country_list_1
country_list_2

country_list <- intersect(country_list_1, country_list_2)
country_list

# comparing distributions
west <- c("Western Europe", "Northern Europe", "Southern Europe", "Northern America", "Australia and New Zealand")

past_year <- 1970
present_year <- 2010
gapminder %>% filter(year %in% c(past_year, present_year) & !is.na(gdp)) %>% mutate(group = ifelse(region %in% west, "West", "Developing")) %>% ggplot (aes(dollars_per_day)) + geom_histogram(binwidth = 1, color = "black") + scale_x_continuous(trans = "log2") + facet_grid(year ~ group)

country_list_1 <- gapminder %>% filter(year == past_year & !is.na(dollars_per_day)) %>% .$country
country_list_2 <- gapminder %>% filter(year == present_year & !is.na(dollars_per_day)) %>% .$country
country_list <- intersect(country_list_1, country_list_2)
gapminder %>% filter(year %in% c(past_year, present_year) & country %in% country_list) %>% mutate(group = ifelse(region %in% west, "West", "Developing")) %>% ggplot (aes(dollars_per_day)) + geom_histogram(binwidth = 1, color = "black") + scale_x_continuous(trans = "log2") + facet_grid(year ~ group)


p <- gapminder %>% filter(year %in% c(past_year, present_year) & country %in% country_list) %>% mutate(region = reorder(region, dollars_per_day, FUN = median)) %>% ggplot() + theme(axis.text.x = element_text(angle = 90, hjust = 1)) + xlab("") + scale_y_continuous(trans = "log2")
p + geom_boxplot(aes(region, dollars_per_day, fill = continent)) + facet_grid(year ~.)

p + geom_boxplot(aes(region, dollars_per_day, fill = factor(year)))

# density plot

gapminder %>% filter(year == past_year & country %in% country_list) %>% mutate(group = ifelse(region %in% west, "West", "Developing")) %>% group_by(group) %>% summarize(n=n()) %>% knitr::kable()

p <- gapminder %>% filter(year %in% c(past_year, present_year) & country %in% country_list) %>% mutate(group = ifelse(region %in% west, "West", "Developing")) %>% ggplot(aes(dollars_per_day, y = ..count.., fill=group)) + scale_x_continuous(trans="log2")
p + geom_density(alpha = 0.2
                 , bw=0.75) + facet_grid(year ~ .)

gapminder <- gapminder %>%
  mutate(group = case_when(
    .$region %in% west ~ "West",
    .$region %in% c("Eastern Asia", "South-Eastern Asia") ~ "East Asia",
    .$region %in% c("Carribean", "Central America", "South America") ~ "Latin America",
    .$continent == "Africa" & .$region != "Northern Africa" ~ "Sub-Saharan Africa",
    TRUE ~ "Others"))

gapminder <- gapminder %>% mutate(group = factor(
  group, levels = c(
    "Others",
    "Latin America",
    "East Asia",
    "Sub-Saharan Africa",
    "West"
  )))

p <- gapminder %>%
  filter(year %in% c(past_year, present_year) & country %in% country_list) %>%
  ggplot(aes(dollars_per_day, y = ..count.., fill=group)) + scale_x_continuous(trans="log2")
p + geom_density(alpha = 0.2
                 , bw=0.75) + facet_grid(year ~ .)

p + geom_density(alpha = 0.2, bw = 0.75, position = "stack") + facet_grid(year ~ .)

gapminder %>%
  filter(year %in% c(past_year, present_year) & country %in% country_list) %>%
  group_by(year) %>%
  mutate(weight = population/sum(population)*2) %>%
  ungroup() %>%
  ggplot(aes(dollars_per_day, fill = group, weight = weight)) +
  scale_x_continuous(trans = "log2") + 
  geom_density(alpha = 0.2, bw = 0.75, position = "stack") +
  facet_grid(year ~ .)