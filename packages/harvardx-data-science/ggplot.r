library(tidyverse)
library(dslabs)
library(ggplot2)
library(ggthemes)
library(ggrepel)
library(gridExtra)
ds_theme_set()

data("murders")

ggplot2::ggplot(murders)
murders %>% ggplot2::ggplot()

p <- ggplot2::ggplot(murders)
class(p)
p

r <- murders %>% summarize(rate = sum(total) / sum(population) * 10^6) %>% .$rate

p <- murders %>% ggplot2::ggplot(ggplot2::aes(population/10^6, total, label=abb))
p <- p + ggplot2::geom_text(nudge_x = 0.075)
# p <- p + ggplot2::geom_text(ggplot2::aes(x=10, y=800, label="Hello there!"),nudge_x = 1)
p <- p + ggplot2::scale_x_log10()
# p <- p + ggplot2::scale_x_continuous(trans = "log10")
p <- p + ggplot2::scale_y_log10()
# p <- p + ggplot2::scale_y_continuous(trans = "log10")
p <- p + ggplot2::xlab("Populations in millions (log scale)")
p <- p + ggplot2::ylab("Total number of murders (log scale)")
p <- p + ggplot2::ggtitle("US Gun Murders in US 2010", )
p <- p + ggplot2::geom_point(size = 3, ggplot2::aes(col=region))
p <- p + ggplot2::geom_abline(intercept = log10(r), lty=2, color="darkgrey")
p <- p + ggplot2::scale_color_discrete(name = "Region")
p <- p + theme_fivethirtyeight()
p

# MALE HEIGHTS
p <- heights %>% filter(sex=="Male") %>% ggplot(aes(x=height)) + geom_histogram(binwidth = 1, fill="blue", color="black")
p <- p + xlab("Male heights in inches")
p <- p + ggtitle("Histogram")

p


p <- heights %>% filter(sex=="Male") %>% ggplot(aes(x=height)) + geom_density(fill="blue")
p

p <- heights %>% filter(sex=="Male") %>% ggplot(aes(sample=height))
params <- heights %>% filter(sex=="Male") %>% summarize(mean = mean(height), sd = sd(height))
p <- p + geom_qq(dparams = params)
p <- p + geom_abline()
p

p <- heights %>% filter(sex=="Male") %>% ggplot(aes(sample=scale(height)))
p <- p + geom_qq()
p <- p + geom_abline()
p

p <- heights %>% filter(sex=="Male") %>% ggplot(aes(x=height))
p1 <- p + geom_histogram(binwidth = 1, fill = "blue", col="black")
p2 <- p + geom_histogram(binwidth = 2, fill = "blue", col="black")
p3 <- p + geom_histogram(binwidth = 3, fill = "blue", col="black")
grid.arrange(p1,p2,p3, ncol=3)



heights %>% 
  ggplot(aes(height)) + geom_density()


## add the group argument then a layer with +
heights %>% 
  ggplot(aes(height, group=sex)) + geom_density()


## edit the next line to use color instead of group then add a density layer
heights %>% 
  ggplot(aes(height, group = sex, color = sex)) + geom_density()

heights %>% 
  ggplot(aes(height, fill = sex, alpha=0.2)) + 
  geom_density() 


heights %>% 
  ggplot(aes(height, fill = sex)) + 
  geom_density(alpha=0.2) 